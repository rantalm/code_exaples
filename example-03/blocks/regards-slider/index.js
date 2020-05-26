/**
 * This component output the HTML of the accordion.
 * the handling is in the theme js files ( whith JQuery )
 */
/**
 * Block dependencies
 */
import './style.css'
import './editor.css'
import classname from 'classnames'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { RichText, AlignmentToolbar, BlockControls, InspectorControls } = wp.editor
const { PanelRow, PanelBody, ToggleControl, Button } = wp.components
const { Fragment } = wp.element

/**
 * Register block
 */
export default registerBlockType('batami/regards', {
  title: __('בת עמי - דרישות שלום', 'batami'),
  description: __('', 'batami'),
  category: 'batamiblocks',
  icon: {
    background: 'rgba(254, 243, 224, 0.52)',
    src: 'heart'
  },
  keywords: [__('דשי"ם', 'batami'), __('דרישת', 'batami'), __('saho', 'batami')],
  supports: {
    align: ['wide', 'full']
  },
  attributes: {
    regardsArray: {
      type: 'array',
      default: []
    },
    currentRegard: {
      type: 'string'
    }
  },

  edit: (props) => {
    const {
      setAttributes,
      attributes: { regardsArray, currentRegard }
    } = props

    const addRegard = () => {
      // Duplicate the array, if use Array.push there is conflicts when serialized for the DB
      const newRegardsArray = [...regardsArray]
      newRegardsArray.push(currentRegard)

      setAttributes({
        regardsArray: newRegardsArray,
        currentRegard: ''
      })
    }

    const removeRegard = (regardToRemove) => {
      const newRegardsArray = regardsArray.filter((regard) => regard !== regardToRemove)
      setAttributes({ regardsArray: newRegardsArray })
    }

    const onChangeRegard = (newRegard, index) => {
      const newRegardsArray = [...regardsArray]
      newRegardsArray[index] = newRegard
      setAttributes({ regardsArray: newRegardsArray })
    }

    return [
      <InspectorControls>
        <PanelBody title='הגדרות'>
          <PanelRow>
            {/* <ToggleControl
                                label={ __( 'השאר רק אחד פתוח', 'batami' ) }
                                // checked={  }
                                // onChange={  }
                            /> */}
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      ,
      <div className='container'>
        <RichText value={currentRegard} onChange={(currentRegard) => setAttributes({ currentRegard })} placeholder='הכניסי ד"ש' />
        <Button onClick={addRegard} className='edit-btn'>
          הכניסי פריט
        </Button>

        <section className='section section--no-pad'>
          {regardsArray.map((regard, index) => (
            <div className='regards__item--editor-wrapper'>
              <RichText
                tagName='li'
                className='regards__item'
                placeholder={__('הכניסי ד"ש', 'batami')}
                onChange={(newRegard) => onChangeRegard(newRegard, index)}
                value={regard}
              />

              <Button className='posts__remove edit-remove-item' onClick={() => removeRegard(regard)}>
                <span>&times;</span>
              </Button>
            </div>
          ))}
        </section>
      </div>
    ]
  },
  save: (props) => {
    /**
     * The behavior is in the theme js files
     */

    const {
      attributes: { regardsArray, currentRegard }
    } = props

    if (!regardsArray || !regardsArray.length) return ''

    return (
      <div className='container full-width'>
        <section className='section section--no-pad-sides'>
          <div className='regards'>
            <h3 className='regards__title'>דשי"ם וחיבוקים</h3>
            <ul className='regards__items'>
              {regardsArray.map((regard) => (
                <li className='regards__item'>{regard}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    )
  }
})
