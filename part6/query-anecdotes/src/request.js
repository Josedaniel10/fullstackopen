const baseURL = 'http://localhost:1234/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseURL)
  if (!res.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await res.json()
}

export const createAnecdote = async (content) => {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, votes: 0 }),
  })

  const data = await res.json()

  if(data.error) {
    throw new Error(data.error)
  }

  return data
}

export const updateAnecdote = async (anecdote) => {
  const res = await fetch(`${baseURL}/${anecdote.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(anecdote),
  })

  if (!res.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await res.json()
}
