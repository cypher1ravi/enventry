import React from 'react';
import logo from "../imges/logo.png";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Navbar() {
    const { loginUser, authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Optionally, redirect to the login page after logout
        navigate('/');
    };

    return (
        <nav id='main-menu' className="navbar bg-white fixed-top shadow">
            <div className="container-fluid">

                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <img src={logo} alt="Logo" width="80" height="40" className="d-inline-block align-text-top" />
                </button>
                <div>{loginUser && <span>Welcome Back {loginUser}</span>}</div>

                <div className="d-none d-md-flex input-group w-auto">
                    {authenticated ? (
                        <button className="list-group-item list-group-item-action py-2 ripple" onClick={handleLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i><span>Logout</span>
                        </button>
                    ) : ('')}
                </div>
            </div>
        </nav>
    );
}
