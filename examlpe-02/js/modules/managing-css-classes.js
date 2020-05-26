// handle front page flip-cards
const manageFrontPageFlipCardsCssClasses = () => {
  const flipCards = document.querySelectorAll('.flip-card--click-temp')
  const fp20PerCardsInner = document.querySelectorAll('.block-20-per__inner')
  const fp20PerInner = document.querySelectorAll('.block-20-per__inner')

  flipCards.forEach((el) => {
    el.addEventListener('click', function () {
      // rollback 20 per blocks in the front page
      if (this.classList.contains('block-20-per__inner')) {
        fp20PerCardsInner.forEach((el) => {
          fp20PerInner.forEach((el) => {
            el.classList.add('flip-card')
            el.classList.remove('flip-card--click')
          })
        })
      }

      // add the flip class
      this.classList.add('flip-card--click')
    })
  })
}

// handle get-offer css classes
const manageGetOfferCssClasses = () => {
  const getOfferForm = document.querySelector('.get-offer-form')
  const getOfferTitle = document.querySelector('.get-offer__title')

  getOfferTitle.addEventListener('click', (e) => {
    getOfferForm.classList.toggle('get-offer-form--active')
    getOfferTitle.classList.toggle('get-offer__title--active')
  })
}

// handle header menu and sub-menus classes

const manageHeaderSubMenusCssClasses = () => {
  const trucksLink = document.getElementById('header-trucks')
  const trucksSubMenu = document.querySelector('.header-sub-menu--trucks')

  const servicesLink = document.getElementById('header-services')
  const servicesSubMenu = document.querySelector('.header-sub-menu--services')

  trucksLink.addEventListener('click', () => {
    servicesSubMenu.classList.remove('header-sub-menu--services--active')
    servicesLink.classList.remove('header-services--active')
    trucksLink.classList.toggle('header-trucks--active')
    trucksSubMenu.classList.toggle('header-sub-menu--trucks--active')
  })

  servicesLink.addEventListener('click', () => {
    trucksSubMenu.classList.remove('header-sub-menu--trucks--active')
    trucksLink.classList.remove('header-trucks--active')
    servicesLink.classList.toggle('header-services--active')
    servicesSubMenu.classList.toggle('header-sub-menu--services--active')
  })
}

// truck features

const manageTruckFeaturesClasses = () => {
  const btns = document.querySelectorAll('.cabin-features__btn')
  const contentItems = document.querySelectorAll('.cabin-features__content-item')

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      let el = e.target.parentElement
      if (document.querySelector('.cabin-features__btn--active') && !el.classList.contains('cabin-features__btn--active')) {
        document.querySelector('.cabin-features__btn--active').classList.remove('cabin-features__btn--active')
        el.classList.add('cabin-features__btn--active')

        if (document.querySelector('.cabin-features__content-item--active')) {
          document.querySelector('.cabin-features__content-item--active').classList.remove('cabin-features__content-item--active')
          let dataInfo = el.dataset.feature

          let itemToShow = document.querySelector(`.cabin-features__content-item[data-feature="${dataInfo}"]`)
          itemToShow.classList.add('cabin-features__content-item--active')
        }
      }
    })
  })
}

export default { manageFrontPageFlipCardsCssClasses, manageGetOfferCssClasses, manageHeaderSubMenusCssClasses, manageTruckFeaturesClasses }
