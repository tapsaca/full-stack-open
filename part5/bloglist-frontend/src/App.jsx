import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isErrorNotification, setIsErrorNotification] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const addedBlog = await blogService.createBlog(
        { title, author, url },
        user.token
      )
      setBlogs(blogs.concat(addedBlog))
      showNotification(`a new blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogFormVisible(false)
    } catch (error) {
      showNotification(error.response.data.error, true)
    }
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
        <div>
          <div style={{ display: blogFormVisible ? 'none' : '' }}>
            <button onClick={() => setBlogFormVisible(true)}>
              create new blog
            </button>
          </div>
          <div style={{ display: blogFormVisible ? '' : 'none' }}>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
              <div>
                <label>
                  title:
                  <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  author:
                  <input
                    type="text"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  url:
                  <input
                    type="text"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                  />
                </label>
              </div>
              <button type="submit">create</button>
            </form>
            <button onClick={() => setBlogFormVisible(false)}>cancel</button>
          </div>
        </div>
      )}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
