import { createSlice } from '@reduxjs/toolkit';

export const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    loadAllBlogs: (state, action) => action.payload,
    createBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) => {
      const { id } = action.payload;
      return state.map((b) => (b.id != id ? b : action.payload));
    },
    removeBlog: (state, action) => {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { loadAllBlogs, createBlog, updateBlog, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
