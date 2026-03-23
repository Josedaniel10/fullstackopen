import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        loadAllUsers: (state, action) => action.payload
    }
})

export const { loadAllUsers } = usersSlice.actions
export default usersSlice.reducer