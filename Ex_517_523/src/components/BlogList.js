import Blog from './Blog'

const BlogList = ({blogs, handleAddLike, username, handleBlogDelete}) => {

    return(
    <div>
        <h3>Blogs</h3>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} handleAddLike={() => handleAddLike(blog.id)} username={username} handleBlogDelete={() => handleBlogDelete(blog.id)}/>)}
    </div>
    )
}

export default BlogList