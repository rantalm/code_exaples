/**
 * Block dependencies
 */
import './style.css'
import './editor.css'

import { isMobile } from './../helpers.js'
import Gallery from '../components/Gallery'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { RichText, Editable, MediaUpload, BlockTitle, InspectorControls, BlockControls } = wp.editor
const { PanelBody, PanelRow } = wp.components

/**
 * Register block
 */

export default registerBlockType(
    'batami/hero',
    {
        title: __( 'בת עמי - הירו', 'batami' ),
        description: __( 'ערוך את התמונה הראשית של הדף', 'batami' ),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },   
        keywords: [
            __( 'Banner', 'batami' ),
            __( 'Hero', 'batami' ),
            __( 'הירו', 'batami' ),
        ],
        attributes: {
            title: {
                type: 'array',
                source: 'children',
                selector: '.hero__box',
            },
            callToAction: {
                type: 'array',
                source: 'children',
                selector: '.hero__btn',
            },
            numberOfImages: {
                type: 'number',
            },
            galleryArray: {
                type: 'array',
                default: []
            },
            galleryArrayDesktop: {
                type: 'array',
                default: []
            }
        },
        edit: props => {
            const { attributes, attributes: { galleryArray, galleryArrayDesktop }, className, setAttributes, numberOfImages } = props
            const onChangeTitle = title => { setAttributes( { title } ) }
            const onChangeBtn = callToAction => { setAttributes( { callToAction } ) }

            // save the images for mobile
            const onSelectImage = galleryArray => { setAttributes( { galleryArray } ) }
            // save the images for desktop
            const onSelectImageDesktop = galleryArrayDesktop => { setAttributes( { galleryArrayDesktop } ) }
            
            //remove images mobile
            const onRemoveImage = el => {
                setAttributes({ galleryArray: [] })
            }
            //remove images desktop
            const onRemoveImageDesktop = el => {
                setAttributes({ galleryArrayDesktop: [] })
            }
            
            const hero__inner_style = {
                backgroundImage: galleryArray[0] ? `url(${galleryArray[0].url})` : ''
            }

           return (
                <div className="hero">
                    <div className="hero__inner" style={hero__inner_style} >
                        <div className="hero__box">
                            <BlockTitle />
                            <RichText
                                tagName="div"                       
                                placeholder={  __( 'הכנס כותרת', 'batami' ) }
                                onChange={ onChangeTitle }
                                value={ attributes.title }
                            />
                        </div>
                    </div>
                    <a className="hero__btn" href="#">
                        <RichText
                            tagName="div"
                            placeholder={ __( 'הכניסי טקסט לקישור', 'batami' ) }
                            onChange={ onChangeBtn }
                            value={ attributes.callToAction }
                        />  
                    </a>
                    <Gallery 
                        attributes={ attributes }
                        onSelectImage = { onSelectImage }
                        onRemoveImage = { onRemoveImage }
                        numberOfImages = { numberOfImages }
                        description={ 'בחרי תמונות (מובייל)' }
                        multiple={ true }
                        imagesArray= { galleryArray }
                    />

                    <Gallery 
                        attributes={ attributes }
                        onSelectImage = { onSelectImageDesktop }
                        onRemoveImage = { onRemoveImageDesktop }
                        numberOfImages = { numberOfImages }
                        description={ 'בחרי תמונות (דסקטופ)' }
                        multiple={ true }
                        imagesArray= { galleryArrayDesktop }
                    />
                </div>
            );
        },

        save: props => {
            const { attributes: { galleryArray, galleryArrayDesktop }, className } = props;
            const mobile = isMobile()
           
            // the slider initialised and defind at the theme (batami) js
            // 
            return (
                <div>
                    <div className="hero swiper-container hero-slider">
                        <div className="swiper-wrapper">
                            { galleryArray.map( slide =>  <div className="hero__inner hero-slider__inner swiper-slide" style={ { backgroundImage: `url(${slide.url})`} }> </div> ) }
                        </div>
                        <div className="hero__box">
                            { props.attributes.title }
                        </div>
                        {props.attributes.callToAction[0] ?
                        <div className="hero__btn" >
                            { props.attributes.callToAction }
                        </div>
                        : ''}
                    </div>
                    <div className="hero swiper-container hero-slider hero-slider--desktop">
                        <div className="swiper-wrapper">
                            { galleryArrayDesktop.map( slide =>  <div className="hero__inner hero-slider__inner--desktop swiper-slide" style={ { backgroundImage: `url(${slide.url})`} }> </div>) }
                        </div>
                        <div className="hero__box">
                            { props.attributes.title }
                        </div>
                        {props.attributes.callToAction[0] ?
                        <div className="hero__btn">
                            { props.attributes.callToAction }
                        </div>
                        : ''}
                    </div>
                </div>
            )
        },
    },
)