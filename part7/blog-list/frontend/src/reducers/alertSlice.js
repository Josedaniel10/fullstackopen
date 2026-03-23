import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: { isActivated: false, message: "", type: 'success' },
    reducers: {
        setConfigAlert: (state, action) => action.payload
    }
})

export const { setConfigAlert } = alertSlice.actions
export default alertSlice.reducer