import './style.css'
import './editor.css'

import editFunction from './edit'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { MediaUpload, URLInput, RichText } = wp.editor
const { Button } = wp.components
import BGColor from '../components/BGColor'


registerBlockType(
    'batami/banners',
    {
        title: __('בת עמי - באנרים', 'batami'),
        description: __('באנר רחב, ובאנרים מרובעים קטנים עם אפשרות כיתוב', 'batami'),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        supports: {
            align: ['wide', 'full'],
        },
        attributes: {
            bannersArrayStr: {
                type: 'string',
                default: '[]'
            },
            currentURL: {
                type: 'string'
            },
            currentTxt: {
                type: 'string'
            },
            currentImgLink: {
                type: 'string'
            },
            currentImgAlt: {
                type: 'string'
            },
            wideBannerStr: {
                type: 'string',
            },
            wideDesktopBannerStr: {
                type: 'string',
            },
            wideBannerURL: {
                type: 'string',
                default: ''
            },
            title: {
                type: 'string'
            },
            padding: {
                type: 'boolean'
            },
            currentBGColor: {
                type: 'string'
           },
        },

        edit: props => {
            return editFunction(props)
        },

        save: props => {

            const { attributes: { bannersArrayStr, currentTxt, currentURL, currentImgLink, currentImgAlt, wideBannerStr, wideBannerURL, wideDesktopBannerStr, title, padding, currentBGColor } } = props

            return(
            
                <div className="conntainer">
                    <section className={ padding ? 'section section--no-pad-sides' : '' } style={ { backgroundColor: currentBGColor } }>
                        <div className="banners">
                            {title ? <h2 className="banners__title">{ title }</h2> : ''}
                            { wideBannerStr ? <div className={`wide-banner mobile-only`} style={ JSON.parse(bannersArrayStr).length === 0 ? { margin: 0 }:''}>
                                <a href={wideBannerURL}>
                                    <img className="wide-banner__img" src={JSON.parse(wideBannerStr)[0].imgLink} alt={ JSON.parse(wideBannerStr)[0].imageAlt } />
                                </a>
                            </div> : '' }
                            { wideDesktopBannerStr ? <div className={`wide-banner desktop-only`} style={ JSON.parse(bannersArrayStr).length === 0 ? { margin: 0 }:''}>
                                <a href={wideBannerURL}>
                                    <img className="wide-banner__img" src={JSON.parse(wideDesktopBannerStr)[0].imgLink} alt={ JSON.parse(wideDesktopBannerStr)[0].imageAlt } />
                                </a>
                            </div> : '' }
                            <div className="four-banners">

                                { JSON.parse(bannersArrayStr).map( banner => {
                                    return (
                                    <div className="four-banners__banner">
                                        <a href={banner.link}>
                                            <img className="wide-banner__img" className="four-banners__img" src={banner.img.link} alt={banner.img.alt} />
                                            { banner.text ? <span className="four-banners__txt">{banner.text}</span> : '' }
                                        </a>
                                    </div>)
                                } ) }
                                
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
)