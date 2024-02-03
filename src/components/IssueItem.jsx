import React, { useState, useEffect } from 'react';

const IssueItem = () => {
    const [employeeName, setEmployeeName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [date, setDate] = useState('');
    const [engineerName, setEngineerName] = useState('');
    const [quantity, setQuantity] = useState('');

    // Product dropdown states
    const [productNames, setProductNames] = useState([]);
    const [selectedProductName, setSelectedProductName] = useState('');
    const [productTypes, setProductTypes] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState('');
    const [productBrands, setProductBrands] = useState([]);
    const [selectedProductBrand, setSelectedProductBrand] = useState('');



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
                    setProductBrands(data.productBrands);
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
            employeeName,
            employeeId,
            productName: selectedProductName,
            productType: selectedProductType,
            productBrand: selectedProductBrand,
            quantity,
            date,
            engineerName,
        };

        try {
            const response = await fetch('http://localhost:3001/consumeProduct/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    <div className="col-md-6 mb-3">
                        <label htmlFor="employeeName" className="form-label"></label>
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
                        <label htmlFor="employeeId" className="form-label"></label>
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
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="productName" className="form-label"></label>
                            <select
                                className="form-control dropdown-toggle"
                                placeholder="Product Name"
                                id="productName"
                                required
                                value={selectedProductName}
                                onChange={(e) => setSelectedProductName(e.target.value)}
                            >
                                <option value="" disabled defaultValue hidden>
                                    Product Name
                                </option>
                                {productNames.map((p, index) => (
                                    <option key={index} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className=" col-md-4 mb-3">
                            <label htmlFor="productType" className="form-label"></label>
                            <select
                                className="form-control"
                                id="productType"
                                required
                                value={selectedProductType}
                                onChange={(e) => setSelectedProductType(e.target.value)}
                            >
                                <option value="" disabled defaultValue hidden>
                                    Product Type
                                </option>
                                {productTypes.map((type, index) => (
                                    <option key={index} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="productBrand" className="form-label"></label>
                            <select
                                className="form-control"
                                id="productBrand"
                                required
                                value={selectedProductBrand}
                                onChange={(e) => setSelectedProductBrand(e.target.value)}
                            >
                                <option value="" disabled defaultValue hidden>
                                    Product Brand
                                </option>
                                {productBrands.map((brand, index) => (
                                    <option key={index} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="date" className="form-label"></label>
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
                        <label htmlFor="quantity" className="form-label"></label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder='Quantity'
                            required
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="engineerName" className="form-label"></label>
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
