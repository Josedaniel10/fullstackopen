import { useState } from 'react'

const FormLogin = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (ev) => {
    ev.preventDefault()
    loginUser({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      <div>
            Username
        <input id='input-username' type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
            Password
        <input id='input-password' type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default FormLogin