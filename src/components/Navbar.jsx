import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import logo from "../imges/logo.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function MyNavbar() {
    const { loginUser, authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Optionally, redirect to the login page after logout
        navigate('/');
    };

    return (
        <Navbar bg="white" expand="md" fixed="top" className="shadow">
            <div className="container-fluid">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand >
                    <img src={logo} alt="Logo" width="80" height="40" className="d-inline-block align-text-top" />
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {loginUser && <Nav.Link>Welcome Back {loginUser}</Nav.Link>}
                    </Nav>
                    <Nav className="d-none d-md-flex">
                        {authenticated ? (
                            <Button variant="outline-warning" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i> Logout
                            </Button>
                        ) : null}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}


