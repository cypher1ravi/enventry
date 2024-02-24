/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../AuthContext';
const IssueItem = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [engineerName, setEngineerName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productId, setProductId] = useState();


    // Product dropdown states
    const [productNames, setProductNames] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [productBrands, setProductBrands] = useState([]);
    const [selectedProductBrands, setSelectedProductBrands] = useState('');
    const { token } = useAuth()


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
    }, [selectedProductName]);

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
                    console.log(data);

                } catch (error) {
                    console.error('Error fetching product brands:', error);
                }
            }
        };

        fetchProductBrands();
    }, [selectedProductName, selectedProductType]);

    const handleIssueItem = async (e) => {
        e.preventDefault();

        const issuedItem = {
            productId,
            employeeId,
            employeeName,
            quantity,
            date,
            engineerName,
        };

        try {
            const response = await fetch('http://localhost:3001/consumeProduct/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(issuedItem),
            });

            if (response.ok) {
                console.log('Item issued successfully!');
                alert('Item issued successfully!');
            } else {
                console.error('Failed to issue item. Server returned:', await response.text());
                alert('Failed to issue item.');
            }
        } catch (error) {
            console.error('An error occurred while issuing the item:', error);
            alert('An error occurred while issuing the item');
        }
    };

    return (
        <div className="container mt-2">
            <h5 className="text-primary">Issue Item</h5>
            <hr />
            <form onSubmit={handleIssueItem}>

                <div className="row">
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
                                value={selectedProductBrands}>
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
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="employeeName" className="form-label">Employee Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeeName"
                            placeholder='Employee Name'
                            required
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="employeeId" className="form-label">Employee ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="employeeId"
                            placeholder='Employee ID'
                            required
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            placeholder='Date'
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className=" col-md-4 mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder='0-9'
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="engineerName" className="form-label">Issued By</label>
                        <input
                            type="text"
                            className="form-control"
                            id="engineerName"
                            placeholder='Engineer Name'
                            required
                            value={engineerName}
                            onChange={(e) => setEngineerName(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >
                    Issue Item
                </button>
            </form>
        </div>
    );
};

export default IssueItem;
