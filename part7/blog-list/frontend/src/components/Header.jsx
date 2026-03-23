import { Link } from 'react-router-dom';
import DisplayUser from './DisplayUser';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Container fluid>
        <div className="d-flex align-items-center gap-3">
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            Blog App
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/" className="text-light">
              Post
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="text-light">
              Users
            </Nav.Link>
          </Nav>
        </div>

        <div className="ms-auto">
          <DisplayUser />
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
