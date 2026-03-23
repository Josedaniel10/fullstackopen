import { useDispatch, useSelector } from "react-redux";
import loginService from "../services/login";
import { saveUser, removeUser } from '../reducers/userSlice';
import FormLogin from "./FormLogin";
import { setConfigAlert } from "../reducers/alertSlice";

const DisplayUser = () => {
  const user = useSelector(({ user })=> user )
  const dispatch = useDispatch()

  const loginUser = async (dataUser) => {
    try {
      const user = await loginService.sendLoginRequest(dataUser);
      dispatch(saveUser(user));
      dispatch(
        setConfigAlert({
          message: 'Log in successfully',
          type: 'success',
          isActivated: true,
        }),
      );
    } catch (err) {
      dispatch(saveUser(null));
      dispatch(
        setConfigAlert({
          message: err.response.data.error,
          type: 'error',
          isActivated: true,
        }),
      );
    }
  };

  const logoutUser = () => {
    dispatch(removeUser());
    dispatch(
      setConfigAlert({
        message: 'Session successfully closed',
        type: 'success',
        isActivated: true,
      }),
    );
  };


  if (user === null) {
    return (
      <div>
        <FormLogin loginUser={loginUser} />
      </div>
    );
  }

  return (
    <div>
      <span>{user.name} logged in</span>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default DisplayUser;
