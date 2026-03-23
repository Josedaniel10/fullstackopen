import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormBlog from '../components/FormBlog';
import blogService from '../services/blogs';
import BlogList from '../components/BlogList';

import Toggable from '../components/Toggable';
import { setConfigAlert } from '../reducers/alertSlice';
import {
  loadAllBlogs,
  createBlog as addBlog,
} from '../reducers/blogSlice';

const Home = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const blogs = useSelector(({ blog }) => [...blog]);
  const user = useSelector(({ user })=> user)

  const createBlog = async (dataBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(dataBlog, user);
    console.log(blog);
    dispatch(addBlog(blog));

    dispatch(
      setConfigAlert({
        message: 'Blog successfully created',
        type: 'success',
        isActivated: true,
      }),
    );
  };

  if(user === null) return

  return (
    <div>
      <Toggable btnLabel="Create new blog" ref={blogFormRef}>
        <FormBlog createBlog={createBlog} />
      </Toggable>
      <BlogList blogs={blogs} user={user} />
    </div>
  );
};

export default Home;
