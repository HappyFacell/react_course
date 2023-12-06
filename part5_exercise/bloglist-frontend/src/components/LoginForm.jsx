import Notification from './notifications'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage,
  errorType
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} notificationtype={errorType} />
        <div>
           username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
           password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  errorType: PropTypes.string.isRequired
}

export default LoginForm