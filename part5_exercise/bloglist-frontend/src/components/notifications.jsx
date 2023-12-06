const Notification = ({ message, notificationtype }) => {
  if (message === null)
    return null
  console.log(message)
  return <div className={notificationtype}>{message}</div>
}

export default Notification