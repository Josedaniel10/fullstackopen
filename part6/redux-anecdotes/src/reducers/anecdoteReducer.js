import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      return state.map(anecdote => 
        action.payload.id !== anecdote.id ? anecdote : action.payload
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const inicializateAnecdotes = ()=> {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createOne(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const newVote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
