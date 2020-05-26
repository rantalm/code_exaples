// Helpers

const playHndler = (e) => {
  let found = false
  currentPlaying = e.target

  userData.tracks.forEach((el) => {
    if (el.id === e.target.id) {
      found = true
      if (el.time > 6) {
        e.target.currentTime = Math.floor(el.time) - 4
      }
    }
  })

  if (!found) {
    userData.tracks.push({
      id: e.target.id,
      time: 0,
      ended: false
    })
  }

  closeOthers()
  updateLocalInfo()
}

const pauseHandler = (e) => {
  e.target = e.target || currentPlaying

  userData.tracks.forEach((el) => {
    if (el.id === e.target.id) {
      console.log(el, e)
      el.time = e.target.currentTime
      return
    }
  })

  updateLocalInfo()
}

const endedHndler = (e) => {
  userData.tracks.forEach((el) => {
    if (el.id === e.target.id) {
      el.time = 0
    }
  })
  updateLocalInfo()
}

const beforeunloadHandler = (e) => {
  //pauseHandler()
}

const closeOthers = () => {}

const updateLocalInfo = () => {
  localStorage.setItem('userAudioData', JSON.stringify(userData))
}
