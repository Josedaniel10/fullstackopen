import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertSlice';
import blogReducer from './reducers/blogSlice';
import userReducer from './reducers/userSlice';
import usersReducer from './reducers/usersSlice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer
  },
});
