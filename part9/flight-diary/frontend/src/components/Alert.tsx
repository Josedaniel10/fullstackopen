interface AlertProps {
    message: string
    isOpen: boolean
}

const Alert = ({ message, isOpen }: AlertProps) => {
  if(!isOpen) {
    return null
  }

  return (
    <div style={{
        color: "red",
        fontSize: "18px",
        padding: "8px 4px"
    }}>
        Error: {message}
    </div>
  )
}
export default Alert