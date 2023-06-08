import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlogState, loggedUser, increaseLike }) => {
  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  let showRemoveButton
  if (!blog.user) {
    showRemoveButton = { display: 'none' }
  } else {
    showRemoveButton = { display: loggedUser.name === blog.user.name ? '' : 'none' }
  }

  const toggleView = () => {
    setView(!view)
  }

  const removeBlog = async () => {
    const result = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService
        .removeBlog(blog.id)
      removeBlogState(blog.id)
    }
  }

  const user = blog.user ? blog.user.name : ''

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleView}>
        view
      </button>
      <button style={showWhenVisible} onClick={toggleView}>
        hide
      </button>
      <div className='extraData' style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={() => increaseLike(blog)}>like</button>
        </div>
        <p>{user}</p>
        <button style={showRemoveButton} onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
