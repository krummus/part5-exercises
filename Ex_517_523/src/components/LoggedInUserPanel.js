const LoggedInUserPanel = ({user, handleLogout}) => {

    return(
    <div>
        {user.name} - logged in - <button onClick={handleLogout}>log out</button>
    </div>
    )
}

export default LoggedInUserPanel