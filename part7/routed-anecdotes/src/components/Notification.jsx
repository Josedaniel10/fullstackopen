const Notification = ({ content, setContent })=> {
  if(!content) {
    return null
  }

  setTimeout(()=> {
    setContent("")
  }, 2000)

  return (
    <p>{content}</p>
  )
}

export default Notification