import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/logins'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import LoggedInUserPanel from './components/LoggedInUserPanel'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errState, setErrState] = useState(false)
  const [errMessage, setErrMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [urllink, setUrlLink] = useState('')

  const getBlogsAndSort = async () => {
    const currentBlogs = await blogService.getAll()
    currentBlogs.sort((a,b) => b.likes - a.likes)
    setBlogs( currentBlogs ) 
  }

  useEffect(() => {
    async function getFirst() {
      getBlogsAndSort()
    }
    getFirst()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      userService.setToken(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')
      setErrMessage(`${user.name} has logged in`)
      setErrState(false)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
    } catch (exception) {
      setErrState(true)
      setErrMessage(`${exception.response.data.error}`)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
      console.log('login failed')
    }
  }

  const handleLogout = async () => {
    setErrMessage(`${user.name} has logged out`)
    setErrState(true)
    setTimeout(() => {
      setErrMessage(null)
    }, 3000)
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title,
      author, 
      url:urllink, 
      likes:0
    }
    try {
      await blogService.createOne(newBlogObject, user.token)
      setErrMessage(`a new blog ${newBlogObject.title} by ${newBlogObject.author}`)
      setErrState(false)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)

      setTitle('')
      setAuthor('')
      setUrlLink('')
      getBlogsAndSort()
    }catch (exception) {
      setErrState(true)
      setErrMessage(`${exception.response.data.error}`)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
      console.log('blog creation failed')
    }
  }

  const handleAddLike = async (id) => {
    const currBlog = blogs.find(blog => blog.id.toString() === id)
    const currLikes = currBlog.likes + 1
    const updatedBlogObject = {
      title: currBlog.title,
      author: currBlog.author,
      url: currBlog.url,
      likes: currLikes,
      users: currBlog.users.map(user => user.id)
    }
    await blogService.updateOne(id.toString(), updatedBlogObject)
    getBlogsAndSort()
  }

  const handleBlogDelete = async (id) => {
    if (window.confirm("Do you really want to delete this blog?")) {
      const blogToDelete = blogs.find(blog => blog.id === id)
      await blogService.deleteOne(id.toString(), user.token)
      setErrMessage(`a new blog ${blogToDelete.title} by ${blogToDelete.author}`)
      setErrState(false)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
    }else{
      setErrMessage(`blog deletion cancelled`)
      setErrState(false)
      setTimeout(() => {
        setErrMessage(null)
      }, 3000)
      console.log('blog not deleted')
    }
    getBlogsAndSort()
  }

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification message={errMessage} errState={errState} />
      {user === null ? <LoginForm
        username = {username}
        password = {password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}/>
      : 
      <div>
        <LoggedInUserPanel
          user={user}
          handleLogout={handleLogout}/>
        <br />
        <Togglable buttonLabel='new blog' id='new-blog-button'>
          <CreateBlog
            title={title}
            author={author}
            urllink={urllink}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrlLink(target.value)}
            handleCreateBlog={handleCreateBlog}
          />
        </Togglable>
        <br />
        <BlogList blogs={blogs} handleAddLike={handleAddLike} username={user.username} handleBlogDelete={handleBlogDelete}/>
      </div>
      }
    </div>
  )
}

export default App
