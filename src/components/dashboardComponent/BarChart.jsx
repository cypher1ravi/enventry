import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, Title, Tooltip, Legend, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

export function Barchart(props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `http://localhost:3001/dashboard/brandof/${props.product}`;
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
    if (!products || products.length === 0) {
        return <p>No data available</p>; // You can display a loading spinner or a message indicating no data
    }

    const data = {
        labels: products.map(product => product.productBrand),
        datasets: [
            {
                label: 'Remaining Quantity',
                data: products.map(product => product.remainingQuantity),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 0, 0, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(128, 0, 128, 0.5)',
                ]
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
