<?php

namespace Batami\Blocks\Post;


add_action( 'plugins_loaded', __NAMESPACE__ . '\render_formatted_post' );
/**
 * @return void
 */
function render_formatted_post() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'batami/post', [
        'render_callback' => __NAMESPACE__ . '\get_dynamic_post',
        'attributes' => [
			'postID' => [ 'type' => 'number' ],
			'currentBGColor' => [ 'type' => 'string', 'default' => '#fff' ],
		],
	] );

}

/**
 * Server rendering for /blocks/post
 */
function get_dynamic_post( $args, $content ) {

    
    $postID = $args['postID'];
    $post = get_post( $postID );

    $url = get_permalink( $postID );
    $title = $post->post_title;
    $excerpt = $post->post_excerpt;
    $imgUrl = get_the_post_thumbnail_url($postID, 'full');
    $date = $post->post_date;
    $bgColor = $args['currentBGColor'];
    $category = get_the_category( $postID )[0]->name;
    $date = get_the_date( 'd.m.y | G:i', $post->ID );


    // 


    $html = sprintf('<div class="container">
            <section class="section" style="">
                <div class="article-preview article-preview--single-post" style="">
                    <a href="%3$s" class="article-preview__img-container">
                        <img class="article-preview__img responsive-img" src="%4$s" alt="%5$s">
                        <span class="article-preview__tag">%7$s</span>
                    </a>
                    <div class="article-preview__content">
                        <a href="%3$s" >
                            <h3 class="article-preview__title">
                                %5$s
                            </h3>
                        </a>
                        <div class="article-preview__date">%8$s</div>
                        <div class="article-preview__excerpt">%6$s</div>
                        <a class="article-preview__read-more" href="%3$s">
                            קרא עוד...
                        </a>
                    </div>
                </div>
            </section>
        </div>',
        '',// Class
        $bgColor,
        $url,
        $imgUrl,
        $title,
        $excerpt,
        $category,
        $date
    );

    
    
    // $html .= '<pre>';
    // $html .= var_export( $bgColor, true );
    // $html .= '<br>---------------------------------------<br>';
    // $html .= var_export( $args, true );
    
    // $html .= '</pre>';

    return $html;
}


