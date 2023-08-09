import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import bootstrap from "bootstrap";
import { Link } from 'react-router-dom';
import "../Stylesheets/Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { setLogout } from '../ReduxState/UserSlice';



function NavBar() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()


    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand><Link to="/" className='navbarLink h2'>iBlog</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user && (
                            <Nav.Link><Link to="/login" className='navbarLink'>Login</Link></Nav.Link>
                        )}


                        {user && (
                            <NavDropdown title={`${user.username}`} id="basic-nav-dropdown" className='navbarLink' align={{ xs: 'start' }}>
                                <NavDropdown.Item >
                                    <Link to='/create' className='navbarLink'>
                                        Create Post
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <Link to='/myposts' className='navbarLink'>
                                        My Posts
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <Link to='/profile' className='navbarLink'>
                                        View Profile
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Button variant="primary" style={{ margin: "0 auto", display: "block" }} onClick={() => {
                                    dispatch(setLogout())
                                    alert("Logout successful")
                                }} >
                                    Logout
                                </Button>
                            </NavDropdown>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavBar