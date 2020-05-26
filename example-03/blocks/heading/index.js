/**
 * Block dependencies
 */
import './style.css'
import './editor.css'
import classname from 'classnames'
import icons from './icons.js'



/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { RichText, AlignmentToolbar, BlockControls, InspectorControls, MediaUpload } = wp.editor
const { SelectControl, Dashicon, Toolbar, Tooltip, Button, PanelRow, PanelBody, ToggleControl } = wp.components
const { Fragment } = wp.element

/**
 * Register block
 */
export default registerBlockType(
    'batami/heading',
    {
        title: __( 'בת עמי - כותרת', 'batami' ),
        description: __( '', 'batami' ),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        keywords: [
            __( 'כותרת', 'batami' ),
            __( 'heading', 'batami' ),
            __( 'title', 'batami' ),
        ],
        supports: {
          align: ['wide', 'full'],
        },
        attributes: {
           titleTag: {
				type: 'string',
				default: 'H2'
           },
		   titleContent: {
			   type: 'array',
			   source: 'children',
			   selector: '.ba-title'
		   },
		   full: {
			   type: 'boolean',
			   default: false
		   },
		   fullP: {
			   type: 'boolean',
			   default: false
		   },
		   alignment: {
			   type: 'string'
       },
       iconURL: {
         type: 'string'
       }
       
      },

    edit: props => {

          const { attributes: { titleTag, titleContent, full, fullP, alignment, iconURL }, setAttributes } = props

          const onSelectIcon = icon => {
            const { url: iconURL } = icon
            setAttributes( { iconURL } )
          }

          const onRemoveIcon = ()=> {
            setAttributes( { iconURL: '' } )
          }

          return (           
          <div className="container">
            <InspectorControls>
              <PanelBody
                  title="הגדרות"
              >
                 
              
              <h3>בחרי תמונה</h3>
              <div class="image-wrapper">
                {iconURL ? <img src={iconURL} className="my-class" style={ { maxWidth: '5rem' } } /> : '' }
                <Button
                  className="remove-image"
                  onClick={ onRemoveIcon }
                >
                  { iconURL ? icons.remove : '' }
                </Button>                 
              </div>      
              <MediaUpload
                className="my-class"
                onSelect={ onSelectIcon }
                type="image"
                render={ ( { open } ) => (
                  <Button
                    className={ "button button-large" }
                    onClick={ open }
                  >
                    { __( 'בחרי אייקון', 'batami' ) }
                  </Button>
                ) }
              />
              </PanelBody>
            </InspectorControls>


            <BlockControls>
              <AlignmentToolbar
                value={ alignment }
                onChange= { alignment => { setAttributes( { alignment } ) } }
              />
              <SelectControl
                name='כותרת'
                className={ 'ba-edit-select' }
                value={ titleTag }
                options={[
                { value: "H2", label: 'H2' },
                { value: "H3", label: 'H3' },
                { value: "H4", label: 'H4' }
                ]}
                onChange={ titleTag => { setAttributes({ titleTag }) } }
              />
              <Toolbar className={ `ba-edit-btn-pad` }>
                <Tooltip text='כותרת מלאה'>
                  <Button
                    className=''
                    onClick={ e => {setAttributes( { full: !full } ) } }
                  
                  >
                    <Dashicon icon="format-aside" />
                  </Button>
                </Tooltip>
                <Tooltip text='כותרת סגולה'>
                  <Button
                    className=''
                    onClick={ e => {setAttributes( { fullP: !fullP } ) } }
                  
                  >
                    <Dashicon icon="format-aside" />
                  </Button>
                </Tooltip>
              </Toolbar>
            </BlockControls>
            <RichText
              tagName={ titleTag }
              multiline={ false }
              onChange={ titleContent => setAttributes( { titleContent } ) }
              placeholder={ __( 'הכניסי כותרת', 'batami' ) }
              value={ titleContent }
              style={ { textAlign: alignment } }
              className={ `ba-title ${ full ? 'ba-title--full' : '' } ${ fullP ? 'ba-title--fullp' : '' }` }
            />
          </div>
         )
        },
		       
        save: props => {

          const { attributes: { titleTag, titleContent, full, fullP, alignment, iconURL } } = props

          return (
            <Fragment>
              
              {( titleTag === 'H2' ) ? <h2 className={ `ba-title ${ full ? 'ba-title--full' : '' } ${ fullP ? 'ba-title--fullp' : '' } ${ iconURL ? 'ba-title--with-icon' : '' }` } style={ { textAlign: alignment } }>
                { iconURL ? <img src={iconURL} /> : '' }
                {titleContent}
              </h2> : ''}
              {( titleTag === 'H3' ) ? <h3 className={ `ba-title ${ full ? 'ba-title--full' : '' } ${ fullP ? 'ba-title--fullp' : '' }` } style={ { textAlign: alignment } }>
                { iconURL ? <img src={iconURL} /> : '' }
                {titleContent}
              </h3> : ''}
              {( titleTag === 'H4' ) ? <h4 className={ `ba-title ${ full ? 'ba-title--full' : '' } ${ fullP ? 'ba-title--fullp' : '' }` } style={ { textAlign: alignment } }>
                { iconURL ? <img src={iconURL} /> : '' }
                {titleContent}
              </h4> : ''}
            </Fragment>

          )
        } 
    },
);
