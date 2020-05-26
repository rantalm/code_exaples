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
const {
    PanelRow,
    PanelBody,
    ToggleControl,
    Button
} = wp.components 
const { Fragment } = wp.element

/**
 * Register block
 */
export default registerBlockType(
    'batami/accordion',
    {
        title: __( 'בת עמי - אקורדיון', 'batami' ),
        description: __( '', 'batami' ),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        keywords: [
            __( 'אקורדיון', 'batami' ),
            __( 'accordion', 'batami' ),
        ],
        attributes: {
            accordion: {
                type: 'string',
                default: '[]'
            },
            lastIdentifier: {
                type: 'number',
                default: 0
            },
            closeOthers: {
                type: 'boolean',
                default: false
            },
            newTitle: {
                type: 'string'
            },
            newContent: {
                type: 'string'
            }      
        },

        edit: props => {

            const { attributes: { accordion, lastIdentifier, closeOthers, newTitle, newContent }, setAttributes } = props
            
            const editTitle = ( title, id ) => {
                const newAccordion = JSON.parse( accordion ).map( item => {
                    if( item.id === id ) {
                        item.title = title
                    }
                    return item
                })
                setAttributes( { accordion: JSON.stringify(newAccordion) } )
            }

            const editContent = ( content, id ) => {
                const newAccordion = JSON.parse( accordion ).map( item => {
                    if( item.id === id ) {
                        item.content = content
                    }
                    return item
                })
                setAttributes( { accordion: JSON.stringify( newAccordion ) } )
            }

            const addNew = ()=> {

                const currentIdentifier = lastIdentifier + 1
                const newItem = {
                    title: newTitle,
                    content: newContent,
                    id: currentIdentifier
                }
                const newAccordion = JSON.parse( accordion )
                newAccordion.push(newItem)
                setAttributes(
                    {
                        accordion: JSON.stringify( newAccordion ),
                        lastIdentifier: currentIdentifier,
                        newTitle: '',
                        newContent: ''
                    }
                )
            }

            const removeItem = e => {
                const idToRemove = e.target.parentElement.dataset.id

                if( idToRemove === undefined ) {
                    console.error('remove btn problem. wrapper element clicked.')
                    return
                }

                let newAccordion = JSON.stringify( JSON.parse( accordion ).filter( item => item.id != idToRemove ) )
                
                setAttributes( { accordion: newAccordion } )
            }

            return ([

                <InspectorControls>
                    <PanelBody
                        title="הגדרות"
                    >
                        <PanelRow>
                            <ToggleControl
                                label={ __( 'השאיר רק אחד פתוח', 'batami' ) }
                                checked={ closeOthers }
                                onChange={ closeOthers => setAttributes( { closeOthers } ) }
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls> ,
                ,
                <div className="container">
                    <h2>אקורדיון</h2>
                    <h3>הכניסי פריט { JSON.parse( accordion ).length > 0 ? 'נוסף' : '' }</h3>
                    <RichText
                        value={ newTitle }
                        onChange={ newTitle => setAttributes( { newTitle } ) }
                        placeholder='הכניסי כותרת'
                    />
                    <RichText
                        value={ newContent }
                        onChange={ newContent => setAttributes( { newContent } ) }
                        placeholder='הכניסי תוכן'
                    />
                    <Button
                        onClick={ addNew }
                        className="edit-btn"
                    > הכניסי פריט
                    </Button>
                                  
					<section className="section section--no-pad">
                        <div className="accordion">
                            { JSON.parse( accordion ).length > 0 ? JSON.parse( accordion ).map( el => (
                                <div className="accordion__element" data-identifier={ el.id }>
                                        <Button
                                            className="posts__remove edit-remove-item"
                                            data-id={el.id}
                                            onClick={ removeItem }
                                        >
                                        <span>&times;</span>
                                        </Button>
                                        <RichText
                                            className="accordion__title"
                                            value={ el.title }
                                            onChange={  title  => editTitle( title, el.id ) }
                                        />
                                        <RichText
                                            className="accordion__content"
                                            value={ el.content }
                                            onChange={ content => editContent( content, el.id ) }
                                        />
                                </div>
                            ) ) : null }         
                        </div>
                    </section>
                </div>

            ])
        }
        ,
         
        save: props => {
            
			const { attributes: { accordion, closeOthers } } = props
           return (
                <div className="container">
                    <section className="section section--no-pad">
                        <div className="accordion" data-close-others={ closeOthers.toString() }>
                        { JSON.parse( accordion ).map( el => (
                            <div className="accordion__element" data-identifier={ el.id }>
                                <RichText.Content
                                    className="accordion__title"
                                    tagName="h3"
                                    value={el.title}
                                />                        
                                <RichText.Content
                                    className="accordion__content"
                                    tagName="div"
                                    value={el.content}
                                />                        
                            </div>
                        ) ) }
                            
                        </div>
                    </section>
                </div>
           )
        } 
    },
);