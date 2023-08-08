const BlogDetails = ({blog, handleAddLike, username, handleBlogDelete}) => {
  
    const showDeleteButton = (username) => {
      const currUser = blog.users.find(user => user.username === username)
      if(currUser !== undefined) {
        return(<button onClick={handleBlogDelete}>delete</button>)
      }
    }

return (
    <div>
        <label key={blog.url}>{blog.url}</label><br />
        <label key={blog.likes}>likes</label>: {blog.likes} <button onClick={handleAddLike}>like</button><br />
        {blog.users.map(user => <label key={user.id}>{user.name}</label>)}<br />
        {showDeleteButton(username)}
    </div>
  )
}

export default BlogDetails