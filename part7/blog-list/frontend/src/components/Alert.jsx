import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import RBAlert from 'react-bootstrap/Alert';
import { setConfigAlert } from '../reducers/alertSlice';

const Alert = () => {
  const dispatch = useDispatch();
  const config = useSelector(({ alert }) => alert);

  useEffect(() => {
    if (!config.isActivated) return;
    const id = setTimeout(() => {
      dispatch(setConfigAlert({ ...config, isActivated: false }));
    }, 5000);
    return () => clearTimeout(id);
  }, [config, dispatch]);

  if (!config.isActivated) return null;

  const variant = config.type === 'success' ? 'success' : 'danger';

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 1060 }}>
      <RBAlert
        variant={variant}
        dismissible
        onClose={() => dispatch(setConfigAlert({ ...config, isActivated: false }))}
        className="shadow"
      >
        {config.message}
      </RBAlert>
    </div>
  );
};

export default Alert;
