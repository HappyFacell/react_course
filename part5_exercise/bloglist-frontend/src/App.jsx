import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/notifications";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author}`);
    setErrorType("added");
    setTimeout(() => {
      setErrorMessage(null);
      setErrorType("");
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setErrorType("error");
      setTimeout(() => {
        setErrorMessage(null);
        setErrorType("");
      }, 5000);
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <h1>Blogs app</h1>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage={errorMessage}
          errorType={errorType}
        />
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} notificationtype={errorType} />
          <div>
            <p>
              {user.name} logged-in
              <button onClick={logout}>logout</button>
            </p>
          </div>
          <Togglable showbuttonLabel="new blog" hidebuttonLabel="cancel">
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user}/>
        ))}
      </div>
    </div>
  );
};

export default App;
