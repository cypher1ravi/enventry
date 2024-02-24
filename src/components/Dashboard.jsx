import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { useAuth } from '../AuthContext';


const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [report, setReport] = useState([]);

    const { token } = useAuth();


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch('http://localhost:3001/dashboard/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setProducts(result);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchReportData = async () => {
            try {
                const response = await fetch('http://localhost:3001/dashboard/report', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setReport(result);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchReportData()
        fetchProductData();
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
                        <Card className="shadow mb-4 bg-primary text-white text-center">
                            <Card.Body>
                                <Card.Title>Total Products</Card.Title>
                                <Card.Text className='fs-4'>{totalProducts}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow mb-4 bg-success text-white text-center">
                            <Card.Body>
                                <Card.Title>In stock</Card.Title>
                                <Card.Text className='fs-4'>{inStockProducts}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow mb-4 bg-danger text-white text-center">
                            <Card.Body>
                                <Card.Title >Out of Stock</Card.Title>
                                <Card.Text className='fs-4'>{outOfStockProducts}</Card.Text>
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
