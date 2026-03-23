import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormLogin = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (ev) => {
    ev.preventDefault();
    loginUser({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center gap-2">
      <Form.Control
        id="input-username"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        placeholder="Username"
        className="form-control-sm bg-light text-dark"
      />

      <Form.Control
        id="input-password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
        className="form-control-sm bg-light text-dark"
      />

      <Button variant="light" size="sm" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormLogin;
