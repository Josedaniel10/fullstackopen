import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return { isVisible: true, message: action.payload }
    case 'HIDE':
      return { isVisible: false, message: '' }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, {
    isVisible: false,
    message: '',
  })
  return (
    <NotificationContext.Provider
      value={{ notification, dispatchNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
