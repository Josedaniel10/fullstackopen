const Notification = ({ message, success }) => {
  if(message === null) return null;

  const styleNotification = {
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    fontSize: 18,
    border: '4px solid #000',
    backgroundColor: 'lightgrey'
  }

  const styleNotificationSuccess = {
    ...styleNotification,
    border: '4px solid #70b62aff',
    color: '#70b62aff'
  }

  const styleNotificationError = {
    ...styleNotification,
    border: '4px solid red',
    color: 'red'
  }

  return (
    <div style={success ? styleNotificationSuccess: styleNotificationError}>
        {message}
    </div>
  )
}

export default Notification