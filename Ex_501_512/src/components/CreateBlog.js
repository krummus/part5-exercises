const CreateBlog = ({
    title,
    author,
    urllink,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    handleCreateBlog
}) => {

    return(
    <div>
        <h3>Create Blog</h3>
        <form onSubmit={handleCreateBlog}>
            <div>
                title: 
                <input value={title}  onChange={handleTitleChange} />
            </div>
            <div>
                author: 
                <input value={author}  onChange={handleAuthorChange} />
            </div>
            <div>
                url: 
                <input value={urllink}  onChange={handleUrlChange} />
            </div>
            <div> 
                <button type="submit">create</button>
            </div>
        </form>
    </div>
    )
}

export default CreateBlog