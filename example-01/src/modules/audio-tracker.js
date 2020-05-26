const userData = JSON.parse(localStorage.getItem('userAudioData')) || { tracks: [] }

let currentPlaying
let audioElements
let correspondElement
let lastTrack
let booksSelect = document.getElementById('books')

// The main function -- only this one exported
const audioTracker = () => {
  if (typeof Storage === undefined) {
    return
  }
  audioElements = document.querySelectorAll('.archive-audio-element')

  if (audioElements && audioElements.length) {
    audioElements.forEach((el) => {
      el.addEventListener('play', (e) => {
        playHndler(e)
      })

      el.addEventListener('pause', (e) => {
        pauseHandler(e)
      })

      el.addEventListener('ended', (e) => {
        endedHndler(e)
      })
    })

    //   call the pause function
    //window.addEventListener('beforeunload', beforeunloadHandler)
    addEndedClass()
    booksSelect.addEventListener('change', audioTracker)
    beforeunloadHandler()
  }
}

export default audioTracker

// Helpers

const playHndler = (e) => {
  if (currentPlaying) {
    currentPlaying.pause()
  }
  currentPlaying = e.target
  correspondElement = userData.tracks.find((el) => {
    return el.id === currentPlaying.id
  })

  if (correspondElement) {
    currentPlaying.currentTime = correspondElement.time
  } else {
    userData.tracks.push({
      id: currentPlaying.id,
      time: 0,
      ended: false
    })
    correspondElement = userData.tracks.find((el) => {
      return el.id === currentPlaying.id
    })
  }

  userData.lastTrack = currentPlaying.id
  updateLocalInfo()
}

const pauseHandler = (e) => {
  console.log('paused')
  correspondElement.time = currentPlaying.currentTime ? Math.floor(currentPlaying.currentTime) : 0

  if (e.target === currentPlaying) {
    currentPlaying = null
  }
  updateLocalInfo()
}

const endedHndler = (e) => {
  let next = findNext()

  correspondElement.time = 0
  correspondElement.ended = true

  e.target.classList.add('archive-audio-element--ended')
  updateLocalInfo()

  if (next) {
    next.play()
  }
}

const beforeunloadHandler = (e) => {
  window.addEventListener('beforeunload', () => {
    correspondElement.time = document.querySelector('#' + userData.lastTrack).currentTime
    updateLocalInfo()
  })
}

const addEndedClass = () => {
  let DOMAudioElement
  userData.tracks.forEach((el) => {
    if (el.ended) {
      DOMAudioElement = document.querySelector('#' + el.id)
      if (DOMAudioElement) {
        DOMAudioElement.classList.add('archive-audio-element--ended')
      }
    }
  })
}

const findNext = () => {
  let next = document.querySelector('#' + userData.lastTrack)
  let found
  while (!found) {
    next = next.nextElementSibling
    if (next && next.classList.contains('archive-audio-element')) {
      found = true
      break
    }
    if (!next) {
      return null
    }
  }
  return next
}

const updateLocalInfo = () => {
  localStorage.setItem('userAudioData', JSON.stringify(userData))
}
