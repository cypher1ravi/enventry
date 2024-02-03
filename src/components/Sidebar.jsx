import React from 'react';
import './sidebar.css';

import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === `/layout${path}`; // Assuming your routes start with "/layout"
    };

    return (
        <div>
            <header>
                {/* Sidebar */}
                <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-secondary ">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-4">
                            <Link to="/layout" className={`list-group-item list-group-item-action py-2 ripple ${isActive('') ? 'active' : ''}`}>
                                <i className="fas fa-chart-pie fa-fw me-3"></i><span>Dashboard</span>
                            </Link>

                            <Link to="/layout/addItem" className={`list-group-item list-group-item-action py-2 ripple ${isActive('/addItem') ? 'active' : ''}`}>
                                <i className="fa-solid fa-server me-3"></i><span>Add Item</span>
                            </Link>

                            <Link to="/layout/showItem" className={`list-group-item list-group-item-action py-2 ripple ${isActive('/showItem') ? 'active' : ''}`}>
                                <i className="fa-solid fa-boxes-stacked me-3"></i><span>Show Item</span>
                            </Link>

                            <Link to="/layout/issueItem" className={`list-group-item list-group-item-action py-2 ripple ${isActive('/issueItem') ? 'active' : ''}`}>
                                <i className="fa-solid fa-user-plus me-3"></i><span>Issue Item</span>
                            </Link>

                            <Link to="/layout/showIssuedItem" className={`list-group-item list-group-item-action py-2 ripple ${isActive('/showIssuedItem') ? 'active' : ''}`}>
                                <i className="fa-regular fa-rectangle-list me-3"></i><span>Issued List</span>
                            </Link>

                            <Link to="/layout/changePassword" className={`list-group-item list-group-item-action py-2 ripple ${isActive('/changePassword') ? 'active' : ''}`}>
                                <i className="fas fa-lock fa-fw me-3"></i><span>Change Password</span>
                            </Link>

                        </div>
                    </div>
                </nav>

                {/* Navbar */}
                <Navbar />
            </header>
            <main style={{ marginTop: "58px" }}>
                <div className="container pt-3">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Sidebar;
