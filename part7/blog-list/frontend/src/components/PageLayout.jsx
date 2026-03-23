import { Outlet } from 'react-router-dom';
import Alert from './Alert';
import Header from './Header';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { loadAllBlogs } from '../reducers/blogSlice';
import { useEffect } from 'react';


const PageLayout = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(loadAllBlogs(blogs)));
  }, []);

  return (
    <div>
      <Header />
      <Alert />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
