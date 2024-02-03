import React, { useState, useEffect } from 'react';

const IssuedItems = () => {
    const [issuedItems, setIssuedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const apiUrl = `http://localhost:3001/consumeProduct/?page=${currentPage}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setIssuedItems(data.consumedProducts);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error('Error fetching issued items:', error));
        console.log(issuedItems, totalPages);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mt-2">
            <h5 className='text-primary'>Issued Items</h5>
            <hr />
            <table className="table table-bordered table-striped border-primary table-sm">
                <thead>
                    <tr className='table-info'>
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
                        <tr key={item._id}>
                            <td>{(item.employeeName).toUpperCase()}</td>
                            <td>{item.employeeId}</td>
                            <td>{item.productName}</td>
                            <td>{item.productType}</td>
                            <td>{item.productBrand}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                            <td>{item.engineerName}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="btn btn-primary"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    className="btn btn-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default IssuedItems;
