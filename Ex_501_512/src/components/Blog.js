import { useState } from 'react'

const Blog = ({blog, handleAddLike, username, handleBlogDelete}) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { 
    display: visible ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const showWhenVisible = {
    display: visible ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const showDeleteButton = (username) => {
    const currUser = blog.users.find(user => user.username === username)
    if(currUser !== undefined) {
      return(<button onClick={handleBlogDelete}>delete</button>)
    }
  }

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <label>{blog.title} - {blog.author}  </label><button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <label>{blog.title} - {blog.author}</label><button onClick={toggleVisibility}>hide</button><br />
        <label>{blog.url}</label><br />
        <label>likes</label>: {blog.likes} <button onClick={handleAddLike}>like</button><br />
        {blog.users.map(user => <label key={user.id}>{user.name}</label>)}<br />
        {showDeleteButton(username)}
      </div>
    </div>
 
  )
}

export default Blog

