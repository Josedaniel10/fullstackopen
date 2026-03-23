import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, currentUser }) => {
  return (
    <div className="blog-item">
      <div className="title">
        <h4>
          <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
        </h4>
      </div>
    </div>
  );
};

export default Blog;
