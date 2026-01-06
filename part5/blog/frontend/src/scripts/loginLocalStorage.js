const recoverStoredUser = () => {
  return JSON.parse(localStorage.getItem('loggedInUser')) || null
}

const saveLoggedInUser = user => {
  localStorage.setItem('loggedInUser', JSON.stringify(user))
}

const removeLoggedInUser = () => {
  localStorage.removeItem('loggedInUser')
}

export { recoverStoredUser, saveLoggedInUser, removeLoggedInUser }