<?php

namespace Batami\Blocks\Posts;


add_action( 'plugins_loaded', __NAMESPACE__ . '\render_formatted_posts' );
/**
 * @return void
 */
function render_formatted_posts() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'batami/four-posts', [
        'render_callback' => __NAMESPACE__ . '\get_dynamic_posts',
        'attributes' => [
			'postsDataStr' => [ 'type' => 'string', 'default' => '[]' ],
			'currentBGColor' => [ 'type' => 'string', 'default' => '#fff' ],
		],
	] );

}

/**
 * Server rendering for /blocks/post
 */
function get_dynamic_posts( $args, $content ) {

    $bgColor = $args['currentBGColor'];
    $posts = json_decode( $args['postsDataStr'] );

    $postsIDs = [];
    foreach( $posts as $post ) {
        $postsIDs[] = $post->id;
    }

    $posts = get_posts([ 'post__in' => $postsIDs, 'orderby' => 'post__in' ]);
    $paddig_buttom = count($posts) < 3 ? 'padding-bottom: 0' : '';


    $html = '<section class="section four-articles-container">';

    foreach( $posts as  $key => $post ) {

        $url = get_the_permalink($post->ID);
        $imgUrl = get_the_post_thumbnail_url($post->ID, 'full');
        $title = $post->post_title;
        $excerpt = $post->post_excerpt;
        $category = get_the_category( $post->ID )[0]->name;
        $date = get_the_date( 'd.m.y | G:i', $post->ID );

        $html .= sprintf('
            <div class="article-preview article-preview--small" style="">
                <a href="%3$s" class="article-preview__img-container">
                    <img class="article-preview__img responsive-img responsive-img--small" src="%4$s" alt="">
                    <span class="article-preview__tag">%8$s</span>
                </a>
                <div class="article-preview__content">
                  <a href="%3$s" >
                    <h3 class="article-preview__title">%5$s</h3>
                  </a>
                  <div class="article-preview__date">%9$s</div>
                  <a href="%3$s" class="article-preview__excerpt">%6$s</a>
                  <a href="%3$s" class="article-preview__read-more">
                  קרא עוד...
                  </a>
                </div>
            </div>',
            '',// Class
            $bgColor,
            $url,
            $imgUrl,
            $title,
            $excerpt,
            $paddig_buttom,
            $category,
            $date
        
        );
        // $html .= '<pre>';
        // $html .= var_export( $post->post_excerpt, true );
        // $html .= '<br>---------------------------------------<br>';
    }
    $html .= '</section>';

    
    
    // $html .= '<pre>';
    // $html .= var_export( $args['postsDataStr'], true );
    // $html .= '<br>---------------------------------------<br>';
    // $html .= var_export( $posts, true );
    
    // $html .= '</pre>';

    return $html;
}


