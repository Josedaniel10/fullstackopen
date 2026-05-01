import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client/react"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, token, setPage, show }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN)

  const logout = ()=> {
    setToken(null)
    localStorage.removeItem('library-user-token')
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  if(token) {
    return (
        <div>
            You have successfully logged in.
            <button onClick={logout}>Logout</button>
        </div>
    )
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    login({ variables: { username, password } })
    setPage('books')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  )
}

export default LoginForm
