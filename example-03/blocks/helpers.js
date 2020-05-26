import $ from 'jquery'
/**
 *
 * @param {string} url
 * @return {string} slug
 *
 */
export const getSlug = (url) => {
  let mySlug
  if (url) {
    mySlug = url.split('/')
    mySlug = mySlug.splice(3, mySlug.length).join('/').split('?')[0]
    return mySlug
  } else {
    return null
  }
}

export const getYoutubeIDFromURL = (url) => {
  const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  return url.match(p) ? RegExp.$1 : false
}

export const isMobile = () => {
  return $(window).width() <= 1000 ? true : false
}

///////////////////////////////////
export const baSort = (postsData, URLsArray) => {
  if (!postsData || !URLsArray) {
    return
  }

  let array = []

  URLsArray.forEach((url) => {
    postsData.map((post) => {
      if (!post) {
        return false
      }
      if (post.link && url && getSlug(post.link) === getSlug(url)) {
        array.push(post)
      }
    })
  })
  return array.reverse()
}
