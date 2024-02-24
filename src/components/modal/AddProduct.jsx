import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../AuthContext';

function AddProduct() {
    const [show, setShow] = useState(false);
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const { token } = useAuth()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleAddProduct = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName: productName.toLowerCase(),
            productType: productType.toLowerCase(),
            productBrand: productBrand.toLowerCase(),

        };

        try {
            const response = await fetch('http://localhost:3001/products/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                alert("Product Added Successfully")
                handleClose();
            } else {

                const errorMsg = await response.json();
                alert(errorMsg.error);
            }
        } catch (error) {
            console.error('An error occurred while adding the product:', error);
        }
    };
    return (
        <>
            <Button className='rounded-circle' variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-plus"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleAddProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Product to Inventory</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <Form.Group controlId="productName" className='col-md-4'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="productType" className='col-md-4'>
                                <Form.Label>Product Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productType}
                                    onChange={(e) => setProductType(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="productBrand" className='col-md-4'>
                                <Form.Label>Product Brand</Form.Label>
                                <Form.Control
                                    type="text"

                                    value={productBrand}
                                    onChange={(e) => setProductBrand(e.target.value)}
                                />
                            </Form.Group>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal >
        </>
    );
}

export default AddProduct;
