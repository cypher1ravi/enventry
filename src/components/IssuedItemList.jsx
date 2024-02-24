import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../AuthContext';

const IssuedItemsList = () => {
    const [issuedItems, setIssuedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null); // State to handle errors
    const { token } = useAuth()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/consumeProduct/?page=${currentPage}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setIssuedItems(result.consumedData);
                setTotalPages(result.totalPages);
                setError(null); // Clear any previous errors if data is fetched successfully
            } catch (error) {
                setError(error.message); // Set the error message in state
                console.error('Error fetching issued items:', error);
            }
        }
        fetchData();
    }, [currentPage, token]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const printTable = () => {
        const printContents = document.querySelector('.print-container').outerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        document.querySelector('.print-button').onclick = printTable;
    };

    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between">
                <h5 className='text-primary'>Issued Items</h5>
                <div>
                    <button className="print-button" onClick={printTable}>Print</button>
                </div>
            </div>
            <hr />
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <Table bordered striped hover responsive="md" className='print-container'>
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
                        {issuedItems.length > 0 && (issuedItems.map((item, index) => (
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
                        )))}
                    </tbody>
                </Table>
            )}
            <div className="pagination">
                <Button
                    className='rounded-circle'
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </Button>
                <span className="m-2"> {currentPage} of {totalPages}</span>
                <Button
                    variant="primary"
                    className='rounded-circle small'
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <i className="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>
    );
};

export default IssuedItemsList;
