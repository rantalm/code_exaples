
const handleCabins = ()=> {

    const cabinsTitles = document.querySelectorAll('.cabin-title')
    const cabins = document.querySelectorAll('.cabin')

    cabinsTitles.forEach(element => {
        
        element.addEventListener('click', e => {
            let activeTitle = document.querySelector('.cabin-title--active')
            activeTitle.classList.remove('cabin-title--active')
            element.classList.add('cabin-title--active')

            // get the data att (model)
            let dataAtt = element.dataset.cabinModel

            // hide active cabin-content
            let active = document.querySelector('.cabin-content--active')
            active.classList.remove('cabin-content--active')

            // select the cabin-content eith the same data att and show it
            let elementToShow = document.querySelector(`.cabin-content[data-cabin-model="${dataAtt}"]`)
            elementToShow.classList.add('cabin-content--active')




            ///////////////////////////////
            /////  Change Image ///////////
            ///////////////////////////////
            
            // if data 1 or 2, change src to src1
            let former = active;
            active = document.querySelector('.cabin-content--active')
            
            // if former data src !== active data src change image src

            // get data src
            let activeDataSrc = active.dataset.cabinImgSrc
            let formerDataSrc = former.dataset.cabinImgSrc
            const img = document.querySelector('.cabins__img img')

            //console.log(activeDataSrc, formerDataSrc)

            if(activeDataSrc !== formerDataSrc) {
                img.setAttribute('src', activeDataSrc)
            }
        })
    })
}

export default {handleCabins}