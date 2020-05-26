<?php

namespace Batami\Blocks\Special_Projects;


add_action( 'plugins_loaded', __NAMESPACE__ . '\register_special_projects_slider' );
/**
 * Register the dynamic block.
 * 
 * @return void
 */
function register_special_projects_slider() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Hook server side rendering into render callback
	register_block_type( 'batami/special-projects', [
        'render_callback' =>  __NAMESPACE__ . '\render_special_projects_slider',
	] );

}

/**
 * Server rendering for /blocks/special-projects
 */
function render_special_projects_slider( $x, $y ) {

    $query = new \WP_Query( array(
            'post_type' => 'page',
            'posts_per_page' => -1,
            'post_parent' => 833,
            'order' => 'ASC',
            'orderby' => 'menu_order'
        )
    );

    $project_pages = $query->posts;
    

    $html = '<div class="container special-projects__wrapper">
                <section class="section section--no-pad-left special-projects">
                    <h2 class="section__title color-blue">פרוייקטים יחודיים</h2>

                        <div class="projects-slider swiper-container">
                            <div class="swiper-wrapper">';


                            if( $query->have_posts() ) :
                                while( $query->have_posts() ) :
                                    $query->the_post();

                            $html .= sprintf('<div class="swiper-slide">
                                                <div class="article-preview article-preview--smallest">
                                                    <a href="%1$s" class="article-preview__img-container">
                                                        <img class="article-preview__img" src="%2$s" alt="%3$s">
                                                        <span class="article-preview__tag">%4$s</span>
                                                    </a>
                                                    <a href="%1$s" class="article-preview__content">
                                                        <p class="article-preview__excerpt">&nbsp;&nbsp;%5$s</p>
                                                    </a>
                                                </div>
                                            </div>',
                                            esc_url( get_the_permalink() ),
                                            esc_attr( get_the_post_thumbnail_url( null, 'full' ) ),
                                            esc_html ( get_the_post_thumbnail_caption() ),
                                            esc_html( get_the_title() ),
                                            esc_html( get_the_excerpt() )
                            );

                        endwhile;
                    endif;

                $html .=   '</div>

                        </div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </section>
                </div>';

                // $args = var_export( func_get_args(), true );
                // $html .= '<pre>';
                // $html .= $args;
                // $html .= '</pre>';

                wp_reset_postdata();
                    
            return $html;
}
