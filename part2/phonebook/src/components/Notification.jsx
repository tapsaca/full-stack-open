const Notification = ({ message }) => {
  const notificationStyle = {
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: '5px',
    color: 'green',
    fontSize: '20px',
    marginBottom: '10px',
    padding: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} >
      {message}
    </div>
  )
}

export default Notification
