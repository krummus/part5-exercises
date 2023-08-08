import { useState } from 'react'

const currStyle = { 
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
}

const TogglableBlog = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { ...currStyle,
        display: visible ? 'none' : '' 
    }

  const showWhenVisible = { ...currStyle,
        display: visible ? '' : 'none'
    }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  console.log(props.children)

  return (
    <div>
      <div style={hideWhenVisible}>
        <label>{props.title} - {props.author}  </label><button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} class='togglableContent'>
      <label key={props.title}>{props.title} - {props.author}</label><button onClick={toggleVisibility}>hide</button><br />
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default TogglableBlog