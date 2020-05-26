const contentSliderHandler = () => {

    const pics = document.querySelectorAll('.content-slider__slide img')

    pics.forEach(el => {
        
        el.addEventListener('click', ()=> {
            
            let src = el.src
            let bigPic = document.querySelector('.content-slider__big-pic')
            bigPic.src = src
            
        })      
    });

}

export default contentSliderHandler