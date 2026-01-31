import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const config = useSelector(({ notification }) => notification);
  const dispatch = useDispatch();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 4,
    borderRadios: 10,
    marginBottom: 10,
    borderColor: "orange",
  };

  if (!config.message || !config.duration) {
    return null;
  } else {
    setTimeout(() => {
      dispatch(
        setNotification({
          message: "",
          duration: 0,
        }),
      );
    }, config.duration * 1000);
  }

  return <div style={style}>{config.message}</div>;
};

export default Notification;
