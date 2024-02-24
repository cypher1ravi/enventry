import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../AuthContext';

const AddPurchase = () => {
    const { token } = useAuth();

    const [productNames, setProductNames] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [productBrands, setProductBrands] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedProductBrand, setSelectedProductBrand] = useState('');

    const [quantity, setQuantity] = useState('');
    const [dop, setDop] = useState('');
    const [dow, setDow] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProductNames = async () => {
            try {
                const response = await fetch('http://localhost:3001/products/productName', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                const data = await response.json();
                setProductNames(data);
                // console.log(data);
            } catch (error) {
                console.error('Error fetching product names:', error);
            }
        };
        fetchProductNames();
    }, [token]);

    useEffect(() => {
        const fetchProductTypes = async () => {
            if (selectedProductName) {
                try {
                    const response = await fetch(`http://localhost:3001/products/productTypes/${selectedProductName}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    const data = await response.json();
                    setProductTypes(data.productTypes);
                } catch (error) {
                    console.error('Error fetching product types:', error);
                }
            }
        };
        fetchProductTypes();
    }, [selectedProductName, token]);

    useEffect(() => {
        const fetchProductBrands = async () => {
            if (selectedProductName && selectedProductType) {
                try {
                    const response = await fetch(`http://localhost:3001/products/productBrand/${selectedProductName}/${selectedProductType}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    });
                    const data = await response.json();
                    setProductBrands(data);
                } catch (error) {
                    console.error('Error fetching product brands:', error);
                }
            }
        };
        fetchProductBrands();
    }, [selectedProductName, selectedProductType, token]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            productId: selectedProductBrand,
            quantity,
            dop,
            dow,
            vendorName,
            description
        };

        try {
            const response = await fetch('http://localhost:3001/purches/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                alert("Product Added Successfully")
                console.log('Product added successfully!');
            } else {
                console.error('Failed to add product. Server returned:', await response.text());
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('An error occurred while adding the product:', error);
            alert('An error occurred while adding the product');
        }
    };

    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between">
                <div className='fs-5 text-primary'>Add Purchase To Inventory</div>
            </div>
            <hr className='text-danger' />
            <Form onSubmit={handleAddProduct} className='m-2'>
                <div className="row mb-3">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <Form.Select
                            onChange={(e) => setSelectedProductName(e.target.value)}
                            value={selectedProductName}>
                            <option value="" disabled defaultValue hidden>Select Product Name</option>
                            {productNames.map((p, index) => (
                                <option key={index} value={p}>{p}</option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="productType" className="form-label">Product Type</label>
                        <Form.Select
                            onChange={(e) => setSelectedProductType(e.target.value)}
                            value={selectedProductType}>
                            <option value="" disabled defaultValue hidden>Select Product Type</option>
                            {productTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="productBrand" className="form-label">Product Brand</label>
                        <Form.Select
                            onChange={(e) => setSelectedProductBrand(e.target.value)}
                            value={selectedProductBrand}>
                            <option value="" disabled defaultValue hidden>Select Product Brand</option>
                            {productBrands.map((brand) => (
                                <option key={brand._id} value={brand._id}>{brand.productBrand}</option>
                            ))}
                        </Form.Select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-3">
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md-3">
                        <Form.Group controlId="dop">
                            <Form.Label>Date of Purchase</Form.Label>
                            <Form.Control
                                type="date"
                                value={dop}
                                onChange={(e) => setDop(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md-3">
                        <Form.Group controlId="dow">
                            <Form.Label>End Date of Warranty</Form.Label>
                            <Form.Control
                                type="date"
                                value={dow}
                                onChange={(e) => setDow(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md-3">
                        <Form.Group controlId="vendorName">
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter vendor name"
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-12">
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <Button variant="primary" type="submit">
                    Add Purchase
                </Button>
            </Form>
        </div>
    );
};

export default AddPurchase;
