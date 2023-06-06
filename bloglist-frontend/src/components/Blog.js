import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

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

  const user = blog.user ? blog.user.name : ''

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleView}>
        view
      </button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          likes {likes}
          <button onClick={addLike}>like</button>
        </div>
        <p>{user}</p>
        <button onClick={toggleView}>
          hide
        </button>
      </div>
    </div>  
  )
}

export default Blog
