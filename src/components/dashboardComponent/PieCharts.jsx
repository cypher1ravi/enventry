import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, CategoryScale, Legend);

export default function PieCharts(props) {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:3001/dashboard/typeof/${props.product}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setProducts(data.details);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Handle error (e.g., display error message to the user)
            }
        };

        fetchData();
    }, [props.product]);

    // Check if products is null or empty
    if (!products || products.length === 0) {
        return <p>No data available</p>; // You can display a loading spinner or a message indicating no data
    }

    const pieChartData = {
        labels: products.map(product => product.productType),
        datasets: [
            {
                data: products.map(product => product.totalQuantity),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 0, 0, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(128, 0, 128, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',

                ],
            },
        ],
    };

    return (
        <Pie data={pieChartData} />
    );
}
