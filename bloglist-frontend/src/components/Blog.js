import { useState } from 'react'

const Blog = ({blog}) => {
  const [view, setView] = useState(false)

  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className='blog'>
      {blog.title}
      <button style={hideWhenVisible} onClick={toggleView}>
        view
      </button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button>like</button>
        </div>
        <p>{blog.author}</p>
        <button onClick={toggleView}>
          hide
        </button>
      </div>
    </div>  
  )
}

export default Blog
