import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new entry</h2>

      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
