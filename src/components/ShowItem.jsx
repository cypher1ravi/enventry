import React, { useState, useEffect } from 'react';

const ShowItem = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming you have an API endpoint to fetch item data
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditItem = (itemId) => {
        // Add your edit logic here
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const response = await fetch(`http://localhost:3001/products/delete/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Update the state after successful deletion
                setItems(items.filter(item => item._id !== itemId));
                console.log('Item deleted successfully!');
            } else {
                console.error('Failed to delete item. Server returned:', await response.text());
            }
        } catch (error) {
            console.error('An error occurred while deleting the item:', error);
        }
    };

    return (
        <div className="container mt-2">
            <h5 className='text-primary'>Show Items</h5>
            <hr />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className='table-info'>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Brand</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Vendor Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.productType}</td>
                            <td>{item.productBrand}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                            <td>{item.vendorName}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEditItem(item._id)}
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteItem(item._id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowItem;
