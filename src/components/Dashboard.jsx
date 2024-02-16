import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [report, setReport] = useState([]);

    useEffect(() => {
        const apiUrl = `http://localhost:3001/dashboard/`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error))
    }, []);

    useEffect(() => {
        const apiUrl = `http://localhost:3001/dashboard/report`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setReport(data))
            .catch(error => console.error('Error fetching report:', error))
    }, []);

    // Count total products
    function countStockStatus(products) {
        let totalProducts = products.length;
        let inStockProducts = 0;
        let outOfStockProducts = 0;

        products.forEach(product => {
            if (product.remainingQuantity <= 0) {
                outOfStockProducts++;
            } else {
                inStockProducts++;
            }
        });

        return {
            totalProducts,
            inStockProducts,
            outOfStockProducts
        };
    }

    const { totalProducts, inStockProducts, outOfStockProducts } = countStockStatus(products);

    return (
        <Container className="mt-4">
            <div className="mt-4">
                <Row>
                    <Col md={4}>
                        <Card className="shadow mb-4 bg-primary">
                            <Card.Body>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text>{totalProducts}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow mb-4 bg-success">
                            <Card.Body>
                                <Card.Title>In stock</Card.Title>
                                <Card.Text>{inStockProducts}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow mb-4 bg-danger">
                            <Card.Body>
                                <Card.Title>Out of Stock</Card.Title>
                                <Card.Text>{outOfStockProducts}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="m-2">
                    <Table bordered striped hover responsive>
                        <thead className='table-info'>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Product Brand</th>
                                <th>Total QNT</th>
                                <th>Remaining QNT</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productName}</td>
                                    <td>{item.productType}</td>
                                    <td>{item.productBrand}</td>
                                    <td>{item.totalQuantity}</td>
                                    <td>{item.remainingQuantity}</td>
                                    <td>{item.remainingQuantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Row>
            </div>
        </Container>
    );
};

export default Dashboard;
