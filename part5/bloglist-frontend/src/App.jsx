import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('bloglistUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  }, [])

  const showNotification = (notification, isError = false) => {
    setIsErrorNotification(isError)
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('bloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showNotification(error.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('bloglistUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.createBlog(blog, user.token)
      setBlogs(blogs.concat(addedBlog))
      showNotification(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
    } catch (error) {
      showNotification(error.response.data.error, true)
    }
  }

  const updateBlog = async (blog) => {
    const updatedBlog = await blogService.updateBlog(blog, user.token)
    setBlogs(blogs.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog))
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification} isError={isErrorNotification} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isError={isErrorNotification} />
      <p>
        {user.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      {user && (
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      ))}
    </div>
  )
}

export default App
