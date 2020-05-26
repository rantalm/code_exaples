/**
 * Block dependencies
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

import BGColor from '../components/BGColor'

/**
 * Register block
 */
export default registerBlockType(
    'batami/announcement',
    {
        title: __( 'בת עמי - הודעה', 'batami' ),
        description: __( 'מקום לכותרת, תמונה וטקסט (ללא קישור)', 'batami' ),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        keywords: [
            __( 'הודעה', 'batami' ),
            __( 'מודעה', 'batami' ),
        ],
        attributes: {
           title: {
                type: 'array',
                source: 'children',
                selector: '.txt-img-title__main-title'
           },

           subtitle: {
                type: 'array',
                source: 'children',
                selector: '.txt-img-title__title'
           },

           text: {
               type: 'array',
               source: 'children',
               selector: '.txt-img-title__txt'
           },

           imgURL: {
               type: 'string'
           },

           imgAlt: {
               type: 'string'
           },
           currentBGColor: {
                type: 'string'
           }
        },

        edit: props => {

            const { attributes: { title, subtitle, text, imgURL, imgAlt, currentBGColor }, setAttributes } = props

            const onSelectImage = img => setAttributes( { imgURL: img.url, imgAlt: img.alt } )

            return ([
                <BGColor
                    onChangeBGColor={ currentBGColor => setAttributes( { currentBGColor } ) }
                    currentBGColor={ currentBGColor }                    
                />
             
                ,
            
                <div className="container">
                    <section className="section" >
                        <div className="txt-img-title">
                            <div className="txt-img-title__main-title">
                                <RichText
                                    value={ title }
                                    placeholder={ 'הכניסי כותרת' }
                                    onChange={ title => setAttributes( { title } ) }
                                />
                            </div>
                            <MediaUpload
                                onSelect={ onSelectImage }
                                type="image"
                                render={ ( { open } ) => (
                                <Button
                                    className={ "button button-large" }
                                    onClick={ open }
                                >
                                    { __( 'בחרי תמונה', 'batami' ) }
                                </Button>
                                ) }
                            />
                            <img className="txt-img-title__img" src={ imgURL } alt={ imgAlt } />
                            <h3 class="txt-img-title__title section__title">
                                <RichText
                                    placeholder={ 'הכניסי כותרת משנה' }
                                    value={ subtitle }
                                    onChange={ subtitle => setAttributes( { subtitle } ) }
                                />
                            </h3>
                            <p className="txt-img-title__txt">
                                <RichText
                                    placeholder={ 'הכניסי טקסט' }
                                    value={ text }
                                    onChange={ text => setAttributes( { text } ) }
                                />
                            </p>
                        </div>
                    </section>
                </div>
            ])
        }
        ,
         
        save: props => {

            const { attributes: { title, subtitle, text, imgURL, imgAlt, currentBGColor } } = props
           return (
            <div className="container">
                <section className="section">
                    <div className="txt-img-title">
                        <h2 className="txt-img-title__main-title section__title">{ title }</h2>
                        <img className="txt-img-title__img responsive-img" src={ imgURL } alt={ imgAlt } />
                        <h3 class="txt-img-title__title section__title">{ subtitle }</h3>
                        <p className="txt-img-title__txt">{ text }</p>
                    </div>
                </section>
            </div>

           )
        } 
    },
);
