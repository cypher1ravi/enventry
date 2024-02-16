const mergedArray = [
    {
        "_id": "65cdea90adf5e7828499d104",
        "productId": "65caee927a38fddaa309b8f9",
        "employeeName": "vinod",
        "employeeId": "9500125",
        "quantity": 1,
        "date": "2024-02-16",
        "engineerName": "ravi",
        "__v": 0
    },
    {
        "_id": "65caee927a38fddaa309b8f9",
        "productName": "mouse",
        "productType": "wireless",
        "productBrand": "hp",
        "__v": 0
    }
]
// const mergedArray = (data.productTypes)
mergedArray.map((e, index) => (
    console.log(e.employeeId),
    console.log(e.employeeName)
))