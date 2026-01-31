const baseUrl = 'http://localhost:1234/anecdotes'

const getAll = async ()=> {
    const res = await fetch(baseUrl)
    if(!res.ok) throw new Error('Failed fetch to anecdotes')

    return await res.json()
}

const createOne = async (content) => {
    const opc = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content, votes: 0 })
    }

    const res = await fetch(baseUrl, opc)
    if(!res.ok) throw new Error('Failed create to anecdotes')

    return await res.json()
}

const update = async (anecdote) => {
    const opc = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anecdote)
    }

    const res = await fetch(`${baseUrl}/${anecdote.id}`, opc)
    if(!res.ok) throw new Error('Failed update to anecdotes')
    
    return await res.json()
}

export default {
    getAll,
    createOne,
    update
}