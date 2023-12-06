import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user,handleLikes, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const toggleVisiblility = () => {
    setVisible(!visible)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisiblility}>hide</button>
        </div>

        <div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={handleLikes}>Like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
        {blog.user.name === user.name ? (
          <button onClick={handleRemove}>remove</button>
        )
          : null
        }
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisiblility}>
          view
        </button>
      </div>
    </div>
  )
}

Blog.PropTypes = {
  handleLikes: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog
