import React, { useState, useEffect } from 'react';
import AddProduct from './modal/AddProduct';
import EditProductModal from './modal/EditProduct'; // Import the new modal component

const ShowItem = () => {
    const [items, setItems] = useState([]);
    const [editItemId, setEditItemId] = useState(null); // State to manage the ID of the item being edited

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming you have an API endpoint to fetch item data
                const response = await fetch('http://localhost:3001/products/');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditItem = (itemId) => {
        setEditItemId(itemId); // Set the ID of the item being edited
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
            <div className="d-flex justify-content-between">
                <h5 className='text-primary'>Show Products</h5>
                <div>
                    <AddProduct />
                </div>

            </div>
            <hr className='text-danger' />
            <table className="table table-striped table-bordered hover">
                <thead>
                    <tr className='table-info'>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.productType}</td>
                            <td>{item.productBrand}</td>

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

            {/* Edit Product Modal */}
            <EditProductModal
                show={!!editItemId} // Show the modal when editItemId is not null
                itemId={editItemId} // Pass the item ID to the modal
                onHide={() => setEditItemId(null)} // Close the modal when onHide is triggered
            />
        </div>
    );
};

export default ShowItem;
