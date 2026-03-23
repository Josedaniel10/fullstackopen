import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllUsers } from '../reducers/usersSlice';
import { getUsers } from '../services/user';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(({ users }) => users);
  useEffect(() => {
    getUsers().then((users) => dispatch(loadAllUsers(users)));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users</h2>

      <div className="card p-3">
        <div className="list-users table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${user.id}`)}>
                    {user.name}
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
