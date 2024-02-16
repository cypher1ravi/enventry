import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const AddPurches = () => {
    const [productNames, setProductNames] = useState([]);
    const [productId, setProductId] = useState();
    const [selectedProductName, setSelectedProductName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [productBrands, setProductBrands] = useState([]);
    const [selectedproductBrands, setSelectedProductBrands] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dop, setDop] = useState('');
    const [dow, setDow] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProductNames = async () => {
            try {
                const response = await fetch('http://localhost:3001/products/productName');
                const data = await response.json();
                setProductNames(data);
            } catch (error) {
                console.error('Error fetching product names:', error);
            }
        };

        fetchProductNames();
    }, []);

    useEffect(() => {
        const fetchProductTypes = async () => {
            if (selectedProductName) {
                try {
                    const response = await fetch(`http://localhost:3001/products/productTypes/${selectedProductName}`);
                    const data = await response.json();
                    setProductTypes(data.productTypes);
                } catch (error) {
                    console.error('Error fetching product types:', error);
                }
            }
        };

        fetchProductTypes();
    }, [selectedProductName]);

    useEffect(() => {
        const fetchProductBrands = async () => {
            if (selectedProductName && selectedProductType) {
                try {
                    const response = await fetch(`http://localhost:3001/products/productBrand/${selectedProductName}/${selectedProductType}`);
                    const data = await response.json();
                    setProductBrands(data);
                    console.log(data);

                } catch (error) {
                    console.error('Error fetching product brands:', error);
                }
            }
        };

        fetchProductBrands();
    }, [selectedProductName, selectedProductType]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = {
            productId,
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
                            <option value="" className=' disabled defaultValue hidden'>
                                Product Name
                            </option>
                            {productNames.map((p, index) => (
                                <option key={index} value={p}>
                                    {p}
                                </option>
                            ))}
                        </Form.Select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="productType" className="form-label">Product Type</label>
                        <Form.Select
                            onChange={(e) => setSelectedProductType(e.target.value)}
                            value={selectedProductType}>
                            <option value="" className=' disabled defaultValue hidden'>
                                Product Type
                            </option>

                            {productTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}

                        </Form.Select>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="productBrand" className="form-label">Product Brand</label>
                        <Form.Select
                            onChange={(e) => {
                                setSelectedProductBrands(e.target.value);
                                setProductId(e.target.value);
                            }}
                            value={selectedproductBrands}>
                            <option value="" disabled defaultValue hidden>
                                Product Brand
                            </option>
                            {productBrands.map((brand) => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.productBrand}
                                </option>
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
                                placeholder="0-999"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Form.Group>
                    </div>

                    <div className="col-md-3">
                        <Form.Group controlId="date">
                            <Form.Label>Date of Purches</Form.Label>
                            <Form.Control
                                type="date"
                                value={dop}
                                onChange={(e) => setDop(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-3">
                        <Form.Group controlId="date">
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
                                placeholder=" xyz"
                                value={vendorName}
                                required
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
            </Form >
        </div >
    );
};

export default AddPurches;
