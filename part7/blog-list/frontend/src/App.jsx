import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import BlogPage from './pages/BlogPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<User />} />
          <Route path='blogs/:id' element={<BlogPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
