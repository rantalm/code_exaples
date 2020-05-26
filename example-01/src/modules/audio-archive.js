const audioArchive = document.querySelector('.audio-archive')
const audioContainer = document.querySelector('.audio-elements')
const booksSelect = document.getElementById('books')
let currentBook

const initAudioArchive = () => {
  if (!audioArchive) {
    return
  }

  setRelevantFiles()
  booksSelect.addEventListener('change', setRelevantFiles)
}

function setRelevantFiles() {
  const filesAsString = booksSelect.options[booksSelect.selectedIndex].dataset.files
  const files = filesAsString.split('|')
  let index = 0

  audioContainer.innerHTML = ''

  files.forEach((element) => {
    let src = yhbOptions.homeURL + '/mp3/' + element
    src = src.replace('/en', '')
    src = src.replace('/fr', '')
    src = src.replace('/es', '')
    src = src.replace('/ru', '')

    // append title
    const titles = booksSelect.options[booksSelect.selectedIndex].dataset.titles.split('|')
    const title = document.createElement('P')
    const textnode = document.createTextNode(titles[index])
    title.classList.add('audio-element-title')
    title.appendChild(textnode)
    audioContainer.appendChild(title)

    // apend audio
    const audio = document.createElement('audio')
    audio.id = 'audio-player-' + element.replace('.mp3', '')
    audio.controls = 'controls'
    audio.src = src
    audio.type = 'audio/mp3'
    audio.classList.add('archive-audio-element')
    audioContainer.appendChild(audio)

    index++
  })

  // set data value for audio-elements (the container) by the current book
  currentBook = booksSelect.options[booksSelect.selectedIndex].value
  audioContainer.dataset.currentBook = currentBook
}

export default initAudioArchive
