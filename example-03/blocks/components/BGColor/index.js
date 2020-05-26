import './style.css'
import './editor.css'

const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls, PanelColorSettings } = wp.editor;
import 'classnames'


/**
 * Create an Inspector Controls wrapper Component
 */
class BGColor extends Component {

    constructor() {
        super( ...arguments );
    }
    
    
    render( props ) {
        return(

           <InspectorControls>
               
               <PanelColorSettings
                title={__("צבע רקע", "batami")}
                colorSettings={[
                    {
                    value: this.props.currentBGColor,
                    onChange:  color => this.props.onChangeBGColor( color ) ,
                    label: __("הצבע שנבחר", 'batami'),
                    colors: [                    
                        {
                            slug: 'white',
                            name: 'לבן',
                            color: '#ffffff'  
                        },
                        {
                            slug: 'gray-1',
                            name: 'אפור 1',
                            color: '#fbfbfb',
                        },
                        {
                            slug: 'gray-2',
                            name: 'אפור 2',
                            color: '#ebebec',
                        }
                    ]
                    }
                ]}
                 />

           </InspectorControls>
        )
    }
}

export default BGColor