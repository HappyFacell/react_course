import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/notifications";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
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
  });

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    });

    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author}`);
    setErrorType("added");
    setTimeout(() => {
      setErrorMessage(null);
      setErrorType("");
    }, 5000);
  };

  const handleTitleChange = (event) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    event.preventDefault();
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    event.preventDefault();
    setNewUrl(event.target.value);
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} notificationtype={errorType} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        Author:
        <input value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        Url:
        <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={errorMessage} notificationtype={errorType} />

          <div>
            <p>
              {user.name} logged-in
              <button onClick={logout}>logout</button>
            </p>
          </div>
          <h2>Create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
