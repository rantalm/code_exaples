import './style.css'
import './editor.css'
import icons from './icons.js'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, BlockControls, MediaUpload } = wp.editor;
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
class Gallery extends Component {

    constructor() {
        super( ...arguments );
    }
    
    
    render( props ) {
        const { attributes, attributes: { imgID }, className, description, multiple, imagesArray } = this.props

        return([
           <InspectorControls>
               <PanelBody
                title={ __('בחר תמונות', 'batami') }
               >
               <PanelRow>
                  <div className={ className }>

                    <MediaUpload
                      onSelect={ this.props.onSelectImage }
                      value={ imgID }
                      multiple={ multiple }
                      render={ ( { open } ) => (
                        <Button
                          className={ "button button-large" }
                          onClick={ open }
                        >
                          { icons.upload }
                          { description }
                        </Button> 
                      ) }
                    >
                    </MediaUpload>
                    <h3> {multiple ? __( ' בחרי תמונות מרובות ע"י החזקת מקש CTR', 'batami' ) : ''} </h3>
                    <div class="image-wrapper">
                      { imagesArray ? imagesArray.map(img => <img src={img.url} />) : '' }   
                      <Button
                          className="remove-image"
                          onClick={ this.props.onRemoveImage }
                      >
                          { icons.remove }
                      </Button>                 
                    </div>             
                  </div>
               </PanelRow>

               </PanelBody>
           </InspectorControls>
        ]
            
        )
    }
}

export default Gallery