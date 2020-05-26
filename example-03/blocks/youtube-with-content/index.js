/**
 * Block Dependencies
 */
import './style.css'
import './editor.css'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { MediaUpload, URLInput, RichText } = wp.editor
const { Button } = wp.components
import { getYoutubeIDFromURL } from '../helpers'


/**
 * Register block
 */
export default registerBlockType(
    'batami/youtube-with-content',
    {
        title: __( 'בת עמי - יוטיוב עם תוכן', 'batami' ),
        description: __( 'סרטון יוטיוב עם כותרת וטקסט', 'batami' ),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        keywords: [
            __( 'יוטיוב', 'batami' ),
            __( 'youtube', 'batami' ),
        ],
        attributes: {
            title: {
                type: 'array',
                source: 'children',
                selector: '.our-youtube__title'
            },
            videoURL: {
                type: 'string',
            },

            text: {
                type: 'array',
                source: 'children',
                selector: '.our-youtube .p-txt'
            }
        },

        // Edit
        edit: props => {

            const { attributes, attributes: { title, videoURL, text }, setAttributes } = props

            const videoID = videoURL ? getYoutubeIDFromURL( videoURL ) : null
           
            return(
                <div class="container">
                    <section class="section">
                        <div class="our-youtube">
                            <URLInput
                                value={ videoURL }
                                onChange={ videoURL => setAttributes( { videoURL } ) }
                            />
                            <div class="our-youtube__title section__title">
                                <RichText
                                    value={ title }
                                    onChange={ title => setAttributes( { title } ) }
                                    placeholder={ __('הכניסי כותרת', 'batami') }
                                />
                            </div>
                            <div class="our-youtube__video-container">
                                <div class="our-youtube__video">
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </div>
                            </div>
                            <p class="p-txt">
                                <RichText
                                    value={ text }
                                    onChange={ text => setAttributes( { text } ) }
                                    placeholder={ __('הכניסי טקסט', 'batami') }
                                />
                            </p>
                        </div>
                    </section>
                </div>
            )
        },

        //Save
        save: props => {

            const { attributes, attributes: { videoURL, title, text } } = props
            const videoID = getYoutubeIDFromURL( videoURL )

            return(
                videoURL ?
                <div class="container">
                    <section class="section">
                        <div class="our-youtube">
                            <h2 class="our-youtube__title section__title"> { title ? title : '' } </h2>
                            <div class="our-youtube__video-container">
                                <div class="our-youtube__video">
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoID}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </div>
                            </div>
                            <p class="p-txt"> { text ? text : '' } </p>
                        </div>
                    </section>
                </div>
                : ''
            )
        }

    }
)