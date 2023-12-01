import { useState } from "react";

const Blog = ({ blog, updateLikesOf }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const toggleVisiblility = () => {
    setVisible(!visible);
  };

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
            <button onClick={updateLikesOf}>Like</button>
          </div>
          <div>{blog.user.name}</div>
        </div>
      </div>
    );
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
  );
};

export default Blog;
