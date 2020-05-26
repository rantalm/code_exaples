import './style.css'
import './editor.css'

import classname from 'classnames'
import { getSlug } from '../../helpers'
/**
 *  1. get url or slug
 *  2. return post data - title, excerpt, 
 */
/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {  InspectorControls, BlockControls, MediaUpload } = wp.editor;
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
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
class FromattedPost extends Component {

    constructor() {
        super( ...arguments )
    } 

        
    
    render( props ) {

        const { url, postExcerpt, postImg, postSlug, postTitle, size, notLinkable, BGColorStyle } = this.props

        if( url ) {
            return (
                <div className={`article-preview ${ size ? ` article-preview--${size}` : ''}` } >
                    <a href={ notLinkable ? void 0 : url } className="article-preview__img-container">
                        <img className="article-preview__img" src={postImg} alt={''} />
                        {/* <span className="article-preview__tag">תגית תגית</span> */}
                    </a>
                    <div className="article-preview__content">
                        <a href={ notLinkable ? void 0 : url }>
                            <h3 className="article-preview__title">
                                {postTitle}
                            </h3>
                        </a>
                        {/* <div className="article-preview__time">
                            09:25 | 28.10.18
                        </div> */}
                        <div className="article-preview__excerpt">{postExcerpt}</div>
                        <a className="article-preview__read-more" href={ notLinkable ? void 0 : url }>
                            { __('קרא עוד...', 'batami') }
                        </a>
                    </div>
                </div>
            )
        } else {
            console.log('Error in FormattedPost component')
            return (
                <p>No URL</p>
            )
        }
    }
}

export default FromattedPost