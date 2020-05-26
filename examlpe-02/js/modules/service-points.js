const servicePointsHandler = () => {
  // service-point regions
  const circles = document.querySelectorAll('.content-circle')
  circles.forEach((el) => {
    el.addEventListener('click', () => {
      document.querySelector('.content-circle--active').classList.remove('content-circle--active')
      el.classList.add('content-circle--active')
      const region = el.dataset.region

      const groupToShow = document.querySelector(`.service-points-group[data-region="${region}"]`)
      document.querySelector('.service-points-group--active').classList.remove('service-points-group--active')
      groupToShow.classList.add('service-points-group--active')
    })
  })

  // service-point accordion
  const openEl = document.querySelectorAll('.accordion__open')

  openEl.forEach((el) => {
    el.addEventListener('click', (e) => {
      console.log(el.parentElement)
      let parent = el.parentElement
      parent.classList.toggle('accordion__el--active')
    })
  })
}

export default { servicePointsHandler }
