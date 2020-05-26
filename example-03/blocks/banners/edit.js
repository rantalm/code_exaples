const { MediaUpload, URLInput, RichText, Insp, InspectorControls } = wp.editor
const {
    PanelRow,
    PanelBody,
    CheckboxControl,
    RadioControl,
    RangeControl,
    TextControl,
    TextareaControl,
    ToggleControl,
    SelectControl,
    Button
} = wp.components

const { __ } = wp.i18n


export default props => {
    const { attributes: { bannersArrayStr, wideDesktopBannerStr, currentTxt, currentURL, currentImgLink, currentImgAlt, wideBannerStr, wideBannerURL, title, padding, currentBGColor }, setAttributes } = props

            // small banners image handler
            const onSelectImage = img => setAttributes({ 
                currentImgLink: img.url,
                currentImgAlt: img.alt
             })

             // wide banner image handler
             const onSelectImageWide = img => {
                setAttributes({ 
                wideBannerStr: '[' + JSON.stringify({
                    imgLink: img.url,
                    imgAlt: img.alt
                }) + ']',
             })
            }
             // wide desktop banner image handler
             const onSelectDesktopImageWide = img => {
                setAttributes({ 
                wideDesktopBannerStr: '[' + JSON.stringify({
                    imgLink: img.url,
                    imgAlt: img.alt
                }) + ']',
             })
            }

            // wide banner url change handler
            const onWideURLChange = url => {
                setAttributes({
                    wideBannerURL: url
                })
            }

            // wide benner - remove
            const removeWideBanner = banner => {
                setAttributes({
                    wideBannerStr: '',
                    wideBannerURL: ''
                })
            }
            // wide desktop benner - remove
            const removeDesktopWideBanner = banner => {
                setAttributes({
                    wideDesktopBannerStr: '',
                })
            }

            // small banners
            const onURLChange = url => setAttributes({ currentURL: url })

            const onTextChange = txt => setAttributes({ currentTxt: txt })
            
            const addBanner = () => {
                const bannersArray = JSON.parse(bannersArrayStr)
                if(currentImgLink) {

                    bannersArray.push({
                        img: {
                            link: currentImgLink,
                            alt: currentImgAlt
                        },
                        link: currentURL,
                        text: currentTxt
                    })

                    setAttributes({ bannersArrayStr: JSON.stringify(bannersArray) })
                    setAttributes({
                        currentImgLink: '',
                        currentImgAlt: '',
                        currentTxt: '',
                        currentURL: ''
                    })
                }
            }
            const removeItem = banner => {
                const bannersArray = JSON.parse(bannersArrayStr)
                const newBannersArrayStr = JSON.stringify(bannersArray.filter( currentBanner => (
                    banner.img.link !== currentBanner.img.link || 
                    banner.link !== currentBanner.link ||
                    banner.text !== currentBanner.text
                    ) ))
                setAttributes( {bannersArrayStr: newBannersArrayStr} )
            }

            return([
                // Settings
                <InspectorControls>
                  <PanelBody
                      title="הגדרות"
                  >
                    <PanelRow>
                      <ToggleControl
                        label={ __( 'ריווח למעלה ולמטה', 'batami' ) }
                        checked={ padding }
                        onChange={ padding => setAttributes( { padding } ) }
                      />
                    </PanelRow>
                  </PanelBody>
                </InspectorControls> ,

                // Content
                <div>
                    <h3>באנר רחב</h3>
                    <RichText
                        placeholder={ 'הכניסי טקסט' }
                        value={ title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                    <MediaUpload
                        className="my-class"
                        onSelect={ onSelectImageWide }
                        type="image"
                        render={ ( { open } ) => (
                            <Button
                                className={ "button button-large" }
                                onClick={ open }
                            >
                                { __( 'בחרי תמונה למובייל', 'batami' ) }
                            </Button>
                        ) }
                    />
                    { wideBannerStr ? 
                        <img className="edit-four-banners__prev-img" src={ (JSON.parse(wideBannerStr))[0].imgLink } /> :
                        ""
                    }
                    <br /><br />
                    <MediaUpload
                        className="my-class"
                        onSelect={ onSelectDesktopImageWide }
                        type="image"
                        render={ ( { open } ) => (
                            <Button
                                className={ "button button-large" }
                                onClick={ open }
                            >
                                { __( 'בחרי תמונה לדסקטופ', 'batami' ) }
                            </Button>
                        ) }
                    />
                    { wideDesktopBannerStr ? 

                    <img className="edit-four-banners__prev-img" src={ (JSON.parse(wideDesktopBannerStr))[0].imgLink } /> :
                    ""
                    }
                    <URLInput
                    onChange={ url => onWideURLChange(url) }
                    value={ decodeURI(wideBannerURL) }
                    />



                    <h3>באנרים קטנים</h3>
                    <MediaUpload
                        className="my-class"
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
                    { currentImgLink ? 

                        <img className="edit-four-banners__prev-img" src={currentImgLink} /> :
                        ""
                    }
                    <URLInput
                        onChange={ url => onURLChange(url) }
                        value={ currentURL }
                    />
                    <RichText
                        onChange={ txt => onTextChange(txt) }
                        value={ currentTxt }
                        placeholder="הכניסי טקסט"
                    />
                    <Button
                        onClick={ addBanner }
                        className="edit-btn"
                    > הכניסי באנר
                    </Button>

                    {/** The banners  */}
                    <div className="conntainer">
                        <section className="section section--no-pad-sides" style={ { backgroundColor: currentBGColor } }>
                            <div className="banners">
                            { wideBannerStr ? ( JSON.parse(wideBannerStr)).map( banner => (
                                <div>
                                <Button
                                    className="posts__remove edit-remove-item"
                                    onClick={ () => removeWideBanner(banner) }
                                >
                                    <span>&times;</span>
                                </Button>
                                <div className="wide-banner">
                                    <a href={ void 0 }>
                                        <img className="wide-banner__img" src={banner.imgLink} alt={banner.imgAlt} />
                                    </a>
                                </div>
                                </div>
                            ) ) : ""}
                            { wideDesktopBannerStr ? ( JSON.parse(wideDesktopBannerStr)).map( banner => (
                                <div>
                                <Button
                                    className="posts__remove edit-remove-item"
                                    onClick={ () => removeDesktopWideBanner(banner) }
                                >
                                    <span>&times;</span>
                                </Button>
                                <div className="wide-banner">
                                    <a href={ void 0 }>
                                        <img className="wide-banner__img" src={banner.imgLink} alt={banner.imgAlt} />
                                    </a>
                                </div>
                                </div>
                            ) ) : ""}
                                {/* <div className="wide-banner">
                                    <a href="#">
                                        <img className="wide-banner__img" src="<?php echo get_template_directory_uri() . '/img/banner.png' ?>" alt="" />
                                    </a>
                                </div> */}
                                <div className="four-banners pad-sides">

                                    { JSON.parse(bannersArrayStr).map( banner => {
                                        return (
                                        <div className="four-banners__banner">
                                            <Button
                                                className="posts__remove edit-remove-item"
                                                data-url={banner.img.link}
                                                onClick={ () => removeItem(banner) }
                                            >
                                            <span>&times;</span>
                                            </Button>
                                            <a>
                                                <img className="wide-banner__img" className="four-banners__img" src={banner.img.link} alt={banner.img.alt} />
                                                { banner.text ? <span className="four-banners__txt">{banner.text}</span> : '' }
                                            </a>
                                        </div>)
                                    } ) }
                                    
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            ]
            )
}