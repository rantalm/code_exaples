const initLangIcons = () => {
  const langIcons = document.querySelector('.lang-icons')
  const langIconsBtn = document.querySelector('.lang-icons__choose')

  // check if there is an elment
  if (langIcons && langIconsBtn) {
    // init
    langIconsBtn.addEventListener('click', function () {
      langIcons.classList.toggle('lang-icons--open')
    })

    // handle close
    document.addEventListener('click', function (e) {
      if (
        !(
          e.target.classList.contains('lang-icons__choose') ||
          e.target.classList.contains('lang-icon') ||
          e.target.parentElement.classList.contains('lang-icon')
        )
      ) {
        ////////
        langIcons.classList.remove('lang-icons--open')
      }
    })
  }
}
export default initLangIcons
