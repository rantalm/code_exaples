/**
 * Block dependencies
 */
import './style.css'
import './editor.css'

/**
 * Internal block libraries
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { BlockTitle, InspectorControls, BlockControls, URLInput } = wp.editor
const { PanelBody, PanelRow, Spinner, Button } = wp.components
const { withSelect } = wp.data

/**
 * my dependencies
 */
import { getSlug } from '../helpers'
import { baSort } from '../helpers'
import FormattedPost from '../components/FormattedPost'
import BGColor from '../components/BGColor'
import attributes from './attributes'

export default registerBlockType('batami/four-posts', {
  title: __('בת עמי - פוסטים', 'batami'),
  description: __('ארבעה פוסטים לבחירה', 'batami'),
  category: 'batamiblocks',
  icon: {
    background: 'rgba(254, 243, 224, 0.52)',
    src: 'heart'
  },
  keywords: [__('ארבעה', 'batami'), __('פוסט', 'batami'), __('פוסטים', 'batami')],
  attributes,

  edit: withSelect((select, props) => {
    const { postSlug, url, URLsArrayStr } = props.attributes
    const slugsArray = JSON.parse(URLsArrayStr).map((url) => getSlug(url))

    if (slugsArray && slugsArray.length !== 0) {
      return {
        posts: select('core').getEntityRecords('postType', 'post', { per_page: -1, slug: slugsArray })
      }
    } else {
      return null
    }
  })(({ posts, setAttributes, attributes: { URLsArrayStr, currentURL, postsDataStr, currentBGColor }, slugsArray }) => {
    /**
     * posts is the query result withSelect function returns
     */

    let postsData
    posts &&
      (postsData = posts.map((post) => {
        return {
          title: post.title.rendered,
          excerpt: post.excerpt.raw,
          categories: post.categories,
          img: post.featured_image_src,
          link: post.link,
          id: post.id
        }
      }))
    posts &&
      setAttributes({
        postsDataStr: JSON.stringify(baSort(postsData, JSON.parse(URLsArrayStr)))
      })

    const changeURL = (url) => setAttributes({ currentURL: url })

    const savePost = (e) => {
      let URLsArray = JSON.parse(URLsArrayStr)
      URLsArray.push(currentURL)

      let newURLsArrayStr = JSON.stringify(URLsArray)
      let newPostsdata = JSON.stringify(postsData)

      setAttributes({
        URLsArrayStr: newURLsArrayStr,
        postsDataStr: newPostsdata,
        currentURL: ''
      })
    }

    const removePost = (e) => {
      const URLToRemove = e.target.parentElement.dataset.url
      const URLs = JSON.parse(URLsArrayStr)
      const newURLsArrayStr = JSON.stringify(URLs.filter((url) => url !== URLToRemove))
      setAttributes({ URLsArrayStr: newURLsArrayStr })
    }

    const sorted = baSort(postsData, JSON.parse(URLsArrayStr))

    return [
      <div>
        <h3>הכנס פוסטים</h3>
        <URLInput value={currentURL} onChange={(url) => changeURL(url)} />
        <Button onClick={(e) => savePost(e)} value='הכנס' className='edit-btn'>
          הכנס
        </Button>

        {sorted && sorted.length > 0 ? (
          <section class='section four-articles-container'>
            {sorted.map((post) => (
              <div>
                <Button className='posts__remove edit-remove-item' data-url={post.link} onClick={removePost}>
                  <span>&times;</span>
                </Button>
                <FormattedPost url={post.link} postExcerpt={post.excerpt} postImg={post.img} postTitle={post.title} size='small' notLinkable={true} />
              </div>
            ))}
          </section>
        ) : (
          ''
        )}
      </div>
    ]
  }),

  save: (props) => {
    // rendered by php
    return null
  }
})
