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
                <input value={title} onChange={handleTitleChange} name='titleinput' placeholder='input blog title here'/>
            </div>
            <div>
                author: 
                <input value={author} onChange={handleAuthorChange} name='authorinput' placeholder='input blog author here'/>
            </div>
            <div>
                url: 
                <input value={urllink} onChange={handleUrlChange} name='urlinput' placeholder='input blog url here'/>
            </div>
            <div> 
                <button type="submit">create</button>
            </div>
        </form>
    </div>
    )
}

export default CreateBlog