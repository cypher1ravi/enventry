import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const apiUrl = 'http://localhost:3001/dashboard/card';
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="text-primary mb-4">Dashboard</h3>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products.map((stats, index) => (
                    <div key={index} className="col">
                        <div className={`card bg-${(stats.remainingQuantity <= 3) ? (stats.remainingQuantity <= 0 ? "danger" : "warning") : 'success'} text-white h-100`}
                            style={{ cursor: 'pointer', transition: 'transform 0.3s' }}
                            // onClick={() => alert(`Clicked on ${stats.productName}`)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <div className="card-header">{stats.productName.toUpperCase()}</div>
                            <div className="card-body">
                                <p className="card-text">Total Quantity: {stats.totalQuantity}</p>
                                <p className="card-text">Total Consumed Quantity: {stats.totalConsumedQuantity}</p>
                                <p className="card-text">Remaining Quantity: {stats.remainingQuantity}</p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0">
                                <small className="text-muted">
                                    {stats.remainingQuantity <= 3
                                        ? stats.remainingQuantity <= 0
                                            ? "Out of Stock"
                                            : "Low Stock"
                                        : "In Stock"}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
