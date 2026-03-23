import { useEffect, useState } from 'react';
import { getCommentByBlog } from '../services/comments';
import { formatDate } from '../util';
import { createComment } from '../services/comments';
import { setConfigAlert } from '../reducers/alertSlice';
import { useDispatch } from 'react-redux';


const BoxComments = ({ idBlog }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentByBlog(idBlog).then((c) => setComments(c));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      <FormComment
        comments={comments}
        setComments={setComments}
        idBlog={idBlog}
      />
      <ListComments comments={comments} />
    </div>
  );
};

const FormComment = ({ comments, setComments, idBlog }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const newComment = await createComment({ text, blog: idBlog });
      const listComments = comments.message
        ? [newComment]
        : [...comments, newComment]

      setComments(listComments);
      setText('')

      dispatch(setConfigAlert({
        isActivated: true, message: "New comment added", type: 'success'
      }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={({ target }) => setText(target.value)}
      />
      <button>Add comment</button>
    </form>
  );
};

const ListComments = ({ comments }) => {
  if (comments.message) {
    return (
      <div>
        <p>{comments.message}</p>
      </div>
    );
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.text} - {formatDate(comment.createdAt)}
        </li>
      ))}
    </ul>
  );
};

export default BoxComments;
