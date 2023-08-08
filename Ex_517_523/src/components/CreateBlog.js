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
    <div id='create-blog-form-div'>
        <h3>Create Blog</h3>
        <form onSubmit={handleCreateBlog}>
            <div>
                title: 
                <input value={title} onChange={handleTitleChange} id='titleinput' placeholder='input blog title here'/>
            </div>
            <div>
                author: 
                <input value={author} onChange={handleAuthorChange} id='authorinput' placeholder='input blog author here'/>
            </div>
            <div>
                url: 
                <input value={urllink} onChange={handleUrlChange} id='urlinput' placeholder='input blog url here'/>
            </div>
            <div> 
                <button type="submit" id='blog-submit-button'>create</button>
            </div>
        </form>
    </div>
    )
}

export default CreateBlog