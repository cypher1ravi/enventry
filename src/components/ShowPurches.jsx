import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../AuthContext';

export default function ShowPurches() {
    const [issuedItems, setIssuedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { token } = useAuth()
    useEffect(() => {
        fetch(`http://localhost:3001/purches/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token

            }
        }
        )
            .then(response => response.json())
            .then(data => {
                setIssuedItems(data.purchesData)
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching issued items:', error));
    }, [currentPage]);

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
            <h5 className='text-primary'>Issued Items</h5>
            <div>
                <button className="print-button" onClick={printTable}>Print</button>
            </div>
            <hr />
            <Table bordered striped hover responsive="md">
                <thead className='table-info'>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Type</th>
                        <th>Product Brand</th>
                        <th>QNT</th>
                        <th>Vendor Name</th>
                        <th>Date of Purches</th>
                        <th>End Date Od warranty</th>

                    </tr>
                </thead>
                <tbody>
                    {issuedItems.length > 0 && (issuedItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productData.productName}</td>
                            <td>{item.productData.productType}</td>
                            <td>{item.productData.productBrand}</td>
                            <td>{item.quantity}</td>
                            <td>{item.vendorName}</td>
                            <td>{item.dop}</td>
                            <td>{item.dow}</td>
                        </tr>
                    )))}
                </tbody>
            </Table>
            <div className="pagination">
                <Button
                    className='rounded-circle'
                    variant="primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <i class="fa-solid fa-arrow-left"></i>
                </Button>
                <span className="m-2"> {currentPage} of {totalPages}</span>
                <Button
                    variant="primary"
                    className='rounded-circle small'
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <i class="fa-solid fa-arrow-right"></i>
                </Button>
            </div>
        </div>

    )
}
