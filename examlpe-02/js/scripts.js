// import $ from 'jquery'

import size from './modules/size'
import carousels from './modules/carousel'
import manageCssClasses from './modules/managing-css-classes'
import cabins from './modules/cabins'
import accessibility from './modules/accessibility'
import fpBlocksSliderHandler from './modules/fp-blocks-slider-classes'
import specs from './modules/specs'
import servicePoints from './modules/service-points'
import contentSliderHandler from './modules/content-slider'

// redetect size when screen resize
document.addEventListener('DOMContentLoaded', () => {
  let screen, mobile
  screen = size.size()
  mobile = size.mobile()
  window.addEventListener('resize', () => {
    screen = size.size()
    mobile = size.mobile()
  })

  // list of site carousels
  const a = carousels.homeSlider()
  const b = carousels.fpBlocksSlider()
  const c = carousels.truckSlider1()
  const d = carousels.truckSlider2()
  const e = carousels.specsSlider()
  const f = carousels.tipsSlider()
  const g = carousels.contentSlider()

  fpBlocksSliderHandler()
  window.addEventListener('resize', () => {
    fpBlocksSliderHandler()
  })

  contentSliderHandler()

  manageCssClasses.manageFrontPageFlipCardsCssClasses()
  manageCssClasses.manageGetOfferCssClasses()
  manageCssClasses.manageHeaderSubMenusCssClasses()
  manageCssClasses.manageTruckFeaturesClasses()

  cabins.handleCabins()
  specs.specsHandler()

  // accessibility
  accessibility.accessibilityHandler()
  accessibility.accessibilityHelper()

  fpBlocksSliderHandler()
  window.addEventListener('resize', () => {
    fpBlocksSliderHandler()
  })

  // service points handler
  servicePoints.servicePointsHandler()
})
