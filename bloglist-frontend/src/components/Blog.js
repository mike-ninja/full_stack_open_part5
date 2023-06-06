import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateState, loggedUser }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }
  const showRemoveButton = { display: loggedUser.name === blog.user.name ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const addLike = async () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }
    const updatedBlog = await blogService
      .update(blog.id, blogToUpdate)
    setLikes(updatedBlog.likes)
  }
  
  const removeBlog = async () => {
    const result = window.confirm(`Removing blog ${blog.title} by ${blog.author}`)
    if (result) {
      await blogService
        .removeBlog(blog.id)
      updateState(blog.id)
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
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          likes {likes}
          <button onClick={addLike}>like</button>
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
