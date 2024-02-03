import React, { useState } from 'react';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [description, setDescription] = useState('');

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            productName,
            productType,
            productBrand,
            quantity,
            date,
            vendorName,
            description
        };

        try {
            const response = await fetch('http://localhost:3001/products/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                alert("Product Added Successfully")
                console.log('Product added successfully!');
            } else {
                // Handle the error response
                console.error('Failed to add product. Server returned:', await response.text());
                alert('Failed to add product');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred while adding the product:', error);
        }
    };

    return (
        <div className="container mt-2">
            <h5 className='text-primary'>Add Product To Inventory</h5>
            <hr className='text-danger' />
            <form onSubmit={handleAddProduct}>
                <div className="row ">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                value={productName}
                                placeholder='Product Name:'
                                required
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="productType" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="productType"
                                placeholder='Product Type'
                                required
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="productBrand" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="productBrand"
                                placeholder='Product Brand:'
                                required
                                value={productBrand}
                                onChange={(e) => setProductBrand(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label"></label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                placeholder='Quantity:'
                                required
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label"></label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                placeholder='Date DD/MM/YYYY'
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="vendorName" className="form-label"></label>
                            <input
                                type="text"
                                className="form-control"
                                id="vendorName"
                                placeholder='Vendor Name:'
                                required
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"></label>
                            <textarea
                                className="form-control"
                                row="2"
                                id="description"
                                placeholder='Description:'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
