import './style.css'
import './editor.css'

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType(
    'batami/special-projects',
    {
        title: __( 'בת עמי - סליידר פרוייקטים יחודיים', 'batami' ),
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        attributes: {
          
        },
        supports: {
            align: ['wide', 'full'],
        },
        category: 'batamiblocks',

        edit: props => {
            return(
                <div className="projects-slider--admin">
                    <h2>סליידר פרוייקטים יחודיים</h2>
                    <p>לא ניתן לעריכה</p>
                    <p>הסליידר יופיע בדף עצמו</p>
                </div>
            )
        },
        save: () => null 
    }
)