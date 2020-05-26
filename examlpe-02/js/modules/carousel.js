import Swiper from 'swiper'
import size from './size'

const homeSlider = function () {
  const args = {
    slidesPerView: 1,
    loop: true,
    speed: 2500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    keyboard: {
      enabled: true
    }
  }
  const slider = new Swiper('.home-slider', args)
  return slider
}

const fpBlocksSlider = function () {
  const args = {
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  const slider = new Swiper('.blocks-strip-container', args)
  return slider
}

const truckSlider1 = () => {
  const args = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next-tsf',
      prevEl: '.swiper-button-prev-tsf'
    }
  }

  const slider = new Swiper('.t-slider-first', args)
  return slider
}

const truckSlider2 = () => {
  const args = {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next-tss',
      prevEl: '.swiper-button-prev-tss'
    }
  }

  const slider = new Swiper('.t-slider-second', args)
  return slider
}

const specsSlider = () => {
  const args = {
    slidesPerView: 6,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next-specs',
      prevEl: '.swiper-button-prev-specs'
    }
  }

  const slider = new Swiper('.specs-slider__container--first .specs-slider', args)
  return slider
}

const specsSlider2 = () => {
  const args = {
    slidesPerView: 6,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next-specs2',
      prevEl: '.swiper-button-prev-specs2'
    }
  }

  const slider = new Swiper('.specs-slider__container--second .specs-slider', args)
  return slider
}

const tipsSlider = () => {
  const args = {
    slidesPerView: 1,
    navigation: {
      nextEl: '.swiper-button-prev--tips',
      prevEl: '.swiper-button-next--tips'
    }
  }

  const slider = new Swiper('.tips-slider', args)
  return slider
}

const contentSlider = () => {
  const args = {
    slidesPerView: 5,
    spaceBetween: 30,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-prev-content',
      prevEl: '.swiper-button-next-content'
    }
  }

  const slider = new Swiper('.content-slider', args)

  return slider
}

export default { homeSlider, fpBlocksSlider, truckSlider1, truckSlider2, specsSlider, specsSlider2, tipsSlider, contentSlider }
