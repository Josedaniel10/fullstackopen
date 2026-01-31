import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
  const { dispatchNotification } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    dispatchNotification({
      type: 'SHOW',
      payload: 'New anecdote created',
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
