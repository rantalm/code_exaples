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
const { RichText, AlignmentToolbar, BlockControls } = wp.editor
const { SelectControl, Dashicon, Toolbar, Tooltip, Button } = wp.components
const { Fragment } = wp.element

/**
 * Register block
 */
export default registerBlockType(
    'batami/leave-details',
    {
        title: __('השארת פרטים', 'batami'),
        description: __('טופס השארת פרטים ל-api', 'batami'),
        category: 'batamiblocks',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'heart',
        },
        keywords: [
            __('צור קשר', 'batami'),
            __('form', 'batami'),
            __('יצירת קשר', 'batami'),
        ],
        supports: {
            align: ['wide', 'full'],
        },
        attributes: {
        },

        edit: props => {

            const { attributes: { }, setAttributes } = props

            return (
                <div className="projects-slider--admin">
                    <h2>טופס השארת פרטים</h2>
                    <p>לא ניתן לעריכה</p>
                    <p>הטופס יופיע בדף עצמו</p>
                </div>
            )
        },

        save: props => {

            const { attributes: { } } = props


            return (
                <div className="container leave-details abc">
                    <form method="post" className="leave-details__form">
                        <input type="text" name="FirstName" className="leave-details__input" placeholder="שם פרטי" aria-label="שם פרטי" maxlength="50" />
                        <input type="text" name="LastName" className="leave-details__input" placeholder="שם משפחה" aria-label="שם משפחה" maxlength="50" />
                        <input type="text" name="School" className="leave-details__input" placeholder="בית ספר" aria-label="בית ספר" maxlength="50" />
                        <input type="tel" name="Phone" className="leave-details__input" placeholder="בית ספר" aria-label="בית ספר" maxlength="10" />
                        <button type="submit" className="leave-details__input"> שליחה </button>
                    </form>
                </div>

            )
        },
        deprecated: [
            {

                save: props => {
                    return (
                        <div className="container leave-details">
                            <form method="post" className="leave-details__form">
                                <input type="text" name="FirstName" className="leave-details__input" placeholder="שם פרטי" aria-label="שם פרטי" maxlength="50" />
                                <input type="text" name="LastName" className="leave-details__input" placeholder="שם משפחה" aria-label="שם משפחה" maxlength="50" />
                                <input type="text" name="School" className="leave-details__input" placeholder="בית ספר" aria-label="בית ספר" maxlength="50" />
                                <input type="tel" name="Phone" className="leave-details__input" placeholder="בית ספר" aria-label="בית ספר" maxlength="10" />
                                <button type="submit" className="leave-details__input"> שליחה </button>
                            </form>
                        </div>

                    )
                },
            }
        ]
    },
);
