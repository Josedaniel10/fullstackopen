import { createSlice } from "@reduxjs/toolkit";
import { saveLoggedInUser, recoverStoredUser, removeLoggedInUser } from "../scripts/loginLocalStorage";

export const userSlice = createSlice({
    name: 'user',
    initialState: recoverStoredUser(),
    reducers: {
        saveUser: (state, action) => {
            const user = action.payload
            saveLoggedInUser(user)
            return user
        },
        removeUser: ()=> {
            removeLoggedInUser()
            return null
        }
    }
})

export const { saveUser, removeUser } = userSlice.actions
export default userSlice.reducer