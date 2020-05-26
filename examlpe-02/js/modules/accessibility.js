const accessibilityHandler = () => {

    // display the accessibility-hidden area
    const accessArea = document.querySelector('.accessibility-hidden')
    const accessAreaLinks = document.querySelectorAll('.accessibility-hidden__link')
    //console.log(accessArea, accessAreaLinks)

    accessAreaLinks.forEach(el => {
        el.addEventListener('focus', () => {
            accessArea.classList.add('accessibility-hidden--active')
        })
        el.addEventListener('blur', () => {
            let isOut = true;
            if( !document.activeElement.classList.contains('accessibility-hidden__link') ) {
                accessArea.classList.remove('accessibility-hidden--active')
            }
            
        })
    })

    // open get offer form on the header when the user hit the return key
    const formTitle = document.querySelector('.get-offer__title')
    const getOfferForm = document.querySelector('.get-offer-form')

    formTitle.addEventListener('keyup', (e) => {
        //console.log(e)
        if (e.keyCode === 13) {
            getOfferForm.classList.toggle('get-offer-form--active')
        }
    })
}


// console.log elements when Tab key pressed and more
const accessibilityHelper = () => {
    let prev;
    document.addEventListener('keyup', (e) => {
        if(e.keyCode === 9) {
            if(prev) {
                //prev.style.outline = 'initial'
            }

           // e.target.style.outline = '5px dotted blue'
            console.dir( e.target )

            prev = e.target
        }       
    })
}

export default {
    accessibilityHandler,
    accessibilityHelper
}