import { useState, useEffect, useRef } from 'react'
import './app.css'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin'
import FormBlog from './components/FormBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  recoverStoredUser,
  removeLoggedInUser,
  saveLoggedInUser,
} from './scripts/loginLocalStorage'
import Alert from './components/Alert'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [configAlert, setConfigAlert] = useState({
    message: 'Esta es una alerta',
    type: 'error',
    isActivated: false,
  })
  const blogFormRef = useRef()

  useEffect(() => {
    setUser(recoverStoredUser())
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const loginUser = async (dataUser) => {
    try {
      const user = await loginService.sendLoginRequest(dataUser)
      setUser(user)
      saveLoggedInUser(user)
      setConfigAlert({
        message: 'Log in successfully',
        type: 'success',
        isActivated: true,
      })
    } catch (err) {
      setUser(null)
      setConfigAlert({
        message: err.response.data.error,
        type: 'error',
        isActivated: true,
      })
    }
  }

  const createBlog = async (dataBlog) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(dataBlog, user)
    const blogWithUser = { ...blog, user }
    setBlogs([...blogs, blogWithUser])
    setConfigAlert({
      message: 'Blog successfully created',
      type: 'success',
      isActivated: true,
    })
  }

  const updateLikeBlog = async (id, dataBlog) => {
    try {
      const updatedBlog = await blogService.update(id, dataBlog, user)

      const updatedBlogList = blogs.map((b) => {
        if (b.id === updatedBlog.id) {
          const userObj = updatedBlog.user?.username ? updatedBlog.user : b.user
          return { ...updatedBlog, user: userObj }
        }
        return b
      })

      setBlogs(updatedBlogList)
      setConfigAlert({
        message: `he liked the post "${dataBlog.title}"`,
        type: 'success',
        isActivated: true,
      })
    } catch (err) {
      console.log(err)
      setConfigAlert({
        message: 'Can\'t updated blog',
        type: 'error',
        isActivated: true,
      })
    }
  }

  const removeBlog = async (dataBlog) => {
    try {
      const confirmRemoveBlog = confirm(
        `Do you want to delete the "${dataBlog.title}" blog?`
      )

      if (!confirmRemoveBlog) {
        return setConfigAlert({
          message: 'No changes were made',
          type: 'success',
          isActivated: true,
        })
      }
      await blogService.remove(dataBlog.id, user)
      setBlogs(blogs.filter((b) => b.id !== dataBlog.id))
      return setConfigAlert({
        message: 'Blog successfully deleted',
        type: 'success',
        isActivated: true,
      })
    } catch (err) {
      console.log(err)
      setConfigAlert({
        message: 'The blog could not be deleted',
        type: 'error',
        isActivated: true,
      })
    }
  }

  const logoutUser = () => {
    setUser(null)
    removeLoggedInUser()
    setConfigAlert({
      message: 'Session successfully closed',
      type: 'success',
      isActivated: true,
    })
  }

  if (user === null) {
    return (
      <div>
        <Alert config={configAlert} setConfig={setConfigAlert} />
        <FormLogin loginUser={loginUser} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Alert config={configAlert} setConfig={setConfigAlert} />
      <div>
        <span>{user.name} logged in</span>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <Toggable btnLabel="Create new blog" ref={blogFormRef}>
        <FormBlog createBlog={createBlog} />
      </Toggable>
      <div className="list-blog">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              currentUser={user}
              updateLike={updateLikeBlog}
              removeBlog={removeBlog}
            />
          ))}
      </div>
    </div>
  )
}

export default App
