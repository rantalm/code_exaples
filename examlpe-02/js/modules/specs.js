import sliders from './carousel'

const specsHandler = () => {
    // Show content according to the title
    const titles = document.querySelectorAll('.specs__title')
    
   
    titles.forEach(element => {

        // Add class active to .specs__title
        element.addEventListener('click', e => {
            document.querySelector('.specs__title--active').classList.remove('specs__title--active')
            element.classList.add('specs__title--active')

        // Add class Active to specs-group with the same data attr
        let data = element.dataset.specs;
    

        let groupToShow = document.querySelector(`.specs__group[data-specs="${data}"]`)
        document.querySelector('.specs__group--active').classList.remove('specs__group--active')
        groupToShow.classList.add('specs__group--active')

        // reset slider
        // document.querySelector('.specs-slider__slide--active').classList.remove('specs-slider__slide--active')
        // document.querySelector('.specs__group--active .swiper-slide:first-child .specs-slider__slide').classList.add('specs-slider__slide--active')

        // sliders.specsSlider()
         sliders.specsSlider2()
       
        })
    })

    // Show the right table
    const slides = document.querySelectorAll('.specs-slider__slide')

    slides.forEach( el => {
        el.addEventListener('click', e => {
           
            document.querySelector('.specs__group--active .specs-slider__slide--active').classList.remove('specs-slider__slide--active')
            el.classList.add('specs-slider__slide--active')

            // Show correct table
            let data = el.dataset.table
            
            let tableToShow = document.querySelector(`.specs__group--active .specs-tables[data-table="${data}"]`)
            document.querySelector('.specs__group--active .specs-tables--active').classList.remove('specs-tables--active')
            tableToShow.classList.add('specs-tables--active')
            console.log(tableToShow) 
        })
    })

}

export default {specsHandler}