import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const IssuedItems = () => {
    const [issuedItems, setIssuedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const apiUrl = `http://localhost:3001/consumeProduct/?page=${currentPage}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setIssuedItems(data.consumedData)
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching issued items:', error));
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mt-2">
            <h5 className='text-primary'>Issued Items</h5>
            <hr />
            <Table bordered striped hover responsive="md">
                <thead className='table-info'>
                    <tr>
                        <th>Employee Name</th>
                        <th>Employee ID</th>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Brand</th>
                        <th>QNT</th>
                        <th>Date</th>
                        <th>Engineer Name</th>
                    </tr>
                </thead>
                <tbody>
                    {issuedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.employeeName}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.productData.productName}</td>
                            <td>{item.productData.productType}</td>
                            <td>{item.productData.productBrand}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                            <td>{item.engineerName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="pagination">
                <Button
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <Button
                    variant="primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default IssuedItems;
