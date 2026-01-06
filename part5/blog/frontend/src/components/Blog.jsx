import { useState } from "react";

const Blog = ({ blog, currentUser, updateLike, removeBlog }) => {
  const [view, setView] = useState(false);
  console.log(blog, currentUser)

  const onClickUpdateLike = () => {
    const { id, ...dataBlog } = blog;
    const updateBlog = {
      ...dataBlog,
      likes: blog.likes + 1,
    };
    updateLike(id, updateBlog);
  };

  const onClickRemoveBlog = () => {
    removeBlog(blog);
  };

  if (!view) {
    return (
      <div className="blog-item">
        <div className="title">
          <h4>
            {blog.title} - {blog.author}
          </h4>
          <button onClick={() => setView(!view)}>view</button>
        </div>
      </div>
    );
  }
  return (
    <div className="blog-item">
      <div className="title">
        <h3>{blog.title}</h3>
        <button onClick={() => setView(!view)}>hide</button>
      </div>
      <div className="url">{blog.url}</div>
      <div className="likes">
        <span>likes {blog.likes}</span>
        <button onClick={() => onClickUpdateLike()}>like</button>
      </div>
      <div className="author">{blog.author}</div>
      {currentUser?.username === blog?.user?.username ? (
        <button className="btn-remove" onClick={() => onClickRemoveBlog()}>
          Remove
        </button>
      ) : null}
    </div>
  );
};

export default Blog;
