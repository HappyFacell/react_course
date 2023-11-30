import { useState } from "react";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisiblility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisiblility}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
        {blog.url}
        </div>
        <div>
          likes:{blog.likes}
          <button>Like</button>
        </div>
        <div>
          {user.name}
          </div>
      </div>
    </div>
  );
};

export default Blog;
