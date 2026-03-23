import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlog, removeBlog as deleteBlog } from '../reducers/blogSlice';
import blogService from '../services/blogs';
import { setConfigAlert } from '../reducers/alertSlice';
import BoxComments from '../components/BoxComments';

const BlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector(({ blog }) => [...blog]).find((b) => b.id === id);
  const user = useSelector(({ user }) => user);

  const updateLikeBlog = async () => {
    try {
      const changedBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await blogService.update(id, changedBlog, user);
      console.log(updatedBlog);

      dispatch(updateBlog(updatedBlog));
      dispatch(
        setConfigAlert({
          message: `he liked the post "${updatedBlog.title}"`,
          type: 'success',
          isActivated: true,
        }),
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setConfigAlert({
          message: "Can't updated blog",
          type: 'error',
          isActivated: true,
        }),
      );
    }
  };

  const removeBlog = async () => {
    try {
      const confirmRemoveBlog = confirm(
        `Do you want to delete the "${blog.title}" blog?`,
      );

      if (!confirmRemoveBlog) {
        return dispatch(
          setConfigAlert({
            message: 'No changes were made',
            type: 'success',
            isActivated: true,
          }),
        );
      }
      await blogService.remove(blog.id, user);
      dispatch(deleteBlog(blog.id));
      navigate(-1);
      return dispatch(
        setConfigAlert({
          message: 'Blog successfully deleted',
          type: 'success',
          isActivated: true,
        }),
      );
    } catch (err) {
      console.log(err);
      dispatch(
        setConfigAlert({
          message: 'The blog could not be deleted',
          type: 'error',
          isActivated: true,
        }),
      );
    }
  };

  if (!blog) {
    return <div>Not found blog</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card p-3">
            <h3 className="mb-2">{blog.title}</h3>

            <a className="d-block mb-3" href={blog.url} rel="noreferrer">
              {blog.url}
            </a>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="me-2">likes {blog.likes}</span>
              <button
                className="btn btn-primary btn-sm"
                onClick={updateLikeBlog}
              >
                like
              </button>
            </div>

            <div className="text-muted mb-3">added by {blog.author}</div>

            <BoxComments idBlog={id} />

            {user?.username === blog?.user?.username ? (
              <div className="mt-3">
                <button className="btn btn-danger btn-sm" onClick={removeBlog}>
                  Remove
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
