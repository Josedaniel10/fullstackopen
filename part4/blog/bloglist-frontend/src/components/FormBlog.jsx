import { useState } from 'react'

const FormBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('http://')

  const submitHandler = (ev) => {
    ev.preventDefault()
    const blog = {
      title,
      author,
      url,
      likes: 0,
    }

    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('http://')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={submitHandler}>
        <div>
          Title
          <input
            id='input-title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            id='input-author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            id='input-url'
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button id='submit-blog' type="submit">Submit</button>
      </form>
    </div>
  )
}

export default FormBlog
