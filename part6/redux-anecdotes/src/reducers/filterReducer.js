import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAnecdotes(state, action) {
            return action.payload
        }
    }
})

/* const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export const filterCreator = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: { filter }
    }
} */ 

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer