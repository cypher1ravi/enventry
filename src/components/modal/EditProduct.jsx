import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProduct = ({ show, itemId, onHide }) => {
    const [product, setProduct] = useState({
        productName: '',
        productType: '',
        productBrand: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${itemId}`);
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (show && itemId) {
            fetchProduct();
        }
    }, [show, itemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/products/update/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                console.log('Product updated successfully!');
                onHide(); // Close the modal after successful update
            } else {
                console.error('Failed to update product. Server returned:', await response.text());
            }
        } catch (error) {
            console.error('An error occurred while updating the product:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="productName" value={product.productName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control type="text" name="productType" value={product.productType} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="productBrand">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control type="text" name="productBrand" value={product.productBrand} onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditProduct;
