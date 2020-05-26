/**
 * Block dependencies
 */
import './style.css'
import './editor.css'
import classname from 'classnames'
import axios from 'axios'

const proxy = window.location.hostname.includes('local') ? 'https://cors-anywhere.herokuapp.com/' : ''

/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
//const { RichText, AlignmentToolbar, BlockControls } = wp.editor
const { SelectControl, Dashicon, Toolbar, Tooltip, Button } = wp.components
//const { Fragment } = wp.element

/**
 * Register block
 */
export default registerBlockType(
    'batami/coordinators',
    {
      title: __( 'בת עמי - רכזות', 'batami' ),
      description: __( 'מציג את רשימת רכזות ע"פ בחירה', 'batami' ),
      category: 'batamiblocks',
      icon: {
          background: 'rgba(254, 243, 224, 0.52)',
          src: 'heart',
      },
      keywords: [
          __( 'רכזות', 'batami' ),
          __( 'בנות שירות', 'batami' ),
      ],
      supports: {
        align: ['wide', 'full'],
      },
      attributes: {
        queryStr: {
          type: 'string'
        },
        tablesArrayStr: {
          type: 'string',
        },
        cityValue: {
          type: 'string',
          default: ''
        },
        custValue: {
          type: 'string',
          default: ''
        },
        cooValue: {
          type: 'string',
          default: ''
        },
        instValue: {
          type: 'string',
          default: ''
        },
        rcooValue: {
          type: 'string',
          default: ''
        },
        wageValue: {
          type: 'string',
          default: ''
        },
        cooList: {
          type: 'string'
        }
      },

      edit: props => {

        const { attributes: { 
          tablesArrayStr, cityValue, custValue, cooValue, instValue, rcooValue, wageValue, cooList
        }, setAttributes } = props

        const refreshLists = e => {
          const tablesUrl = '/wp-json/batami/v1/getdata'
          axios.get(tablesUrl, {
            params: {}
          })
          .then( res => {
            setAttributes( { tablesArrayStr: JSON.stringify(res.data.CodeTables) } )
            console.log(res)
            return res
          })
          .catch( err => console.log(err) )
        }

        const buildQuery = e => {
          
          const queryStr = `Search/GetDisplayData?cust=${custValue}&city=${cityValue}&Coo=${cooValue}&Inst=${instValue}&rcoo=${rcooValue}&wage=${wageValue}`
          setAttributes( { queryStr, cooList: '' } )

          axios.get(`${proxy}http://api.bat-ami.org.il/Api/${queryStr}`, {
            params: {}
          })
          .then( res => {
            setAttributes({ cooList: JSON.stringify( res.data ) })
          })
          .catch(err => {
            console.log(err)
          })
        }

        // set the options array
     
        const tablesArray = tablesArrayStr ? JSON.parse( tablesArrayStr ) : null

        const citiesArray = tablesArray ? tablesArray['CityTypes'] : []
        citiesArray.unshift({ Id: '', Name: 'עיר' })

        const customersArray = tablesArray ? tablesArray['Customers'] : []
        customersArray.unshift({ Id: '', Name: 'לקוח' })

        const coordinatorssArray = tablesArray ? tablesArray['Coordiantors'] : []
        coordinatorssArray.unshift({ Id: '', Name: 'רכזת' })
        
        const institutesArray = tablesArray ? tablesArray['Institutes'] : []
        institutesArray.unshift({ Id: '', Name: 'מוסד' })
        
        const regionalCoordinatorsArray = tablesArray ? tablesArray['RegionalCoordinators'] : []
        regionalCoordinatorsArray.unshift({ Id: '', Name: 'מנהלות אזור' })
        
        const wageArray = tablesArray ? tablesArray['WageCodes'] : []
        wageArray.unshift({ Id: '', Name: 'קוד שכר' })
        

        return (           
          <div className="container">
            <section class="section coordinators-list-editor">
            
              <Button
                onClick={ refreshLists }
                className="button button-large"
              >רענני</Button>
              <h2>בחרי אפשרות סינון</h2>			

              <div className="coordinators-list-editor__items">
                <div>
                  <h2>לקוח</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ custValue }
                    options={ ( customersArray && customersArray.length && customersArray.length !== 1 ) ? 
                      customersArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ custValue => setAttributes( { custValue } ) }
                  />
                </div>
                <div>
                  <h2>עיר</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ cityValue }
                    options={ ( citiesArray && citiesArray.length && citiesArray.length !== 1 ) ? 
                      citiesArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ cityValue => setAttributes( { cityValue } ) }
                  />
                </div>
                <div>
                  <h2>רכזת</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ cooValue }
                    options={ ( coordinatorssArray && coordinatorssArray.length && coordinatorssArray.length !== 1 ) ? 
                      coordinatorssArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ cooValue => setAttributes( { cooValue } ) }
                  />
                </div>
                <div>
                  <h2>מוסד</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ instValue }
                    options={ ( institutesArray && institutesArray.length && institutesArray.length !== 1 ) ? 
                      institutesArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ instValue => setAttributes( { instValue } ) }
                  />
                </div>
                <div>
                  <h2>מנהלות אזור</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ rcooValue }
                    options={ ( regionalCoordinatorsArray && regionalCoordinatorsArray.length && regionalCoordinatorsArray.length !== 1 ) ? 
                      regionalCoordinatorsArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ rcooValue => setAttributes( { rcooValue } ) }
                  />
                </div>
                <div>
                  <h2>קוד שכר</h2>
                  <SelectControl
                    name='בחרי'
                    className={ 'ba-edit-select' }
                    value={ wageValue }
                    options={ ( wageArray && wageArray.length && wageArray.length !== 1 ) ? 
                      wageArray.map(el => ({ value: el.Id, label: el.Name })) : [{value: '', label: 'אנא לחצי על "רענני"'}] }
                    onChange={ wageValue => setAttributes( { wageValue } ) }
                  />
                </div>
              </div>

              <Button
                onClick={ buildQuery }
                className="button button-large"
              >אישור</Button>


              <div>
              {( cooList && JSON.parse(cooList).length ) ?
                  <i>נמצאו {JSON.parse(cooList).length} תוצאות</i> : '' }
                <ul>
                  {( cooList && JSON.parse(cooList).length ) ?
                  JSON.parse( cooList ).map( coo =>  <li>{coo.CooName} - {coo.CooPhone} - {coo.Name}</li> ) : '' }
                </ul>
                {( cooList && JSON.parse( cooList ).length === 0  ) ? <h4>לא נמצאו תוצאות</h4> : ''}
              </div>
            </section>
          </div>
              )
      },
	
      save: props => {

			const { attributes: { queryStr } } = props

        return (
          <div className="container">
            <section class="section">
              <div class="coordinators-list" data-query={queryStr}></div>
              <div id="loadin-results" class="loading">
                <div class="loading__element"></div>
              </div>
            </section>
          </div>
        )
      } 
    },
);
