import NotificationContext from "../NotificationContext"
import { useContext } from "react"

const Notification = () => {
  const { notification, dispatchNotification } = useContext(NotificationContext)
  const { isVisible, message } = notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!isVisible) return null

  setTimeout(()=> {
    dispatchNotification({...notification, type: 'HIDE'})
  }, 5000)

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
