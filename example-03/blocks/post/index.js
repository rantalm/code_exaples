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
const { PanelBody, PanelRow, Spinner } = wp.components
const { withSelect } = wp.data

/**
 * my dependencies
 */
import { getSlug, playBlup } from '../helpers'
import FormattedPost from '../components/FormattedPost'
import BGColor from '../components/BGColor'

/**
 * Register block
 */
export default registerBlockType('batami/post', {
  title: __('בת עמי - פוסט', 'batami'),
  description: __('פוסט אחד ע"פ בחירה', 'batami'),
  category: 'batamiblocks',
  icon: {
    background: 'rgba(254, 243, 224, 0.52)',
    src: 'heart'
  },
  keywords: [__('Post', 'batami'), __('פוסט', 'batami')],
  attributes: {
    post: {
      type: 'array',
      default: ['default']
    },
    url: {
      type: 'string'
    },
    postSlug: {
      type: 'string',
      default: ''
    },
    postTitle: {
      type: 'string'
    },
    postExcerpt: {
      type: 'string'
    },
    postImg: {
      type: 'string',
      default: ''
    },
    currentBGColor: {
      type: 'string'
    },
    postID: {
      type: 'number'
    }
  },

  edit: withSelect((select, props) => {
    const { postSlug, url } = props.attributes
    return {
      posts: select('core').getEntityRecords('postType', 'post', { per_page: 1, slug: postSlug })
    }
  })(({ posts, postsAfter, setAttributes, attributes: { url, postSlug, postTitle, postImg, postExcerpt, currentBGColor, postsIDs } }) => {
    // exstract the slug for the query in withSelect function (from helpers.js)
    const mySlug = getSlug(url)

    // set postSlug attribute for the query
    if (mySlug) {
      setAttributes({ postSlug: mySlug })
    }

    // set the attributes when there is a post
    if (posts && posts.length > 0) {
      const queriedPost = posts[0]
      const postUrl = queriedPost.link
      const postTitle = queriedPost.title.raw
      const postExcerpt = queriedPost.excerpt.raw
      const postImg = queriedPost.featured_image_src
      const postID = queriedPost.id
      setAttributes({
        postExcerpt,
        postImg,
        postTitle,
        postID
      })
    }

    return [
      ,
      // <BGColor
      //     onChangeBGColor={ currentBGColor => setAttributes( { currentBGColor } ) }
      //     currentBGColor={ currentBGColor }
      // />
      <div className='get-post-url'>
        <URLInput onChange={(url) => setAttributes({ url })} value={url ? decodeURI(url) : ''} />
        {!posts || 0 === posts.length || !postSlug || !postTitle || !url ? (
          <p>no posts</p>
        ) : (
          <FormattedPost
            url={url}
            postExcerpt={postExcerpt}
            postImg={postImg}
            postSlug={postSlug}
            postTitle={postTitle}
            notLinkable={true}
            //BGColorStyle={ { backgroundColor: currentBGColor } }
          />
        )}
      </div>
    ]
  }),

  save: (props) => {
    // renderd with php fore dynamic changes
    return null

    // const { attributes:{ posts, url, postExcerpt, postImg, postSlug, postTitle, currentBGColor } } = props
    // return url ? (
    //     <div className="container">
    //         <section className="section" style={ { backgroundColor: currentBGColor } }>
    //                 <FormattedPost
    //                     url={url}
    //                     postExcerpt={postExcerpt}
    //                     postImg={postImg}
    //                     postSlug={postSlug}
    //                     postTitle={postTitle}
    //                 />
    //         </section>
    //     </div>
    // ) : <p>no URL</p>
  }
})
