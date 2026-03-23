import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const { id } = useParams();
  const user = useSelector(({ users }) => [...users]).find((u) => u.id === id);

  if (!user) {
    return <div>Not found user</div>;
  }
  return (
    <div className="container mt-4">
      <h2 className="mb-3">{user.name}</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card p-3">
            <h3 className="mb-2">added blogs</h3>
            <ul className="list-group list-group-flush">
              {user?.blogs.map((b) => (
                <li key={b.id} className="list-group-item">
                  {b.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
