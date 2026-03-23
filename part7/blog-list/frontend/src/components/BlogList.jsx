import Blog from './Blog';

const BlogList = ({ blogs, user }) => {

  return (
    <div className="list-blog d-flex flex-column gap-3">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="card p-2 shadow-sm">
            <Blog
              blog={blog}
              currentUser={user}
            />
          </div>
        ))}
    </div>
  );
};

export default BlogList;
