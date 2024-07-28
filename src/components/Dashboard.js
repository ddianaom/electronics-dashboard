import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering components for ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
    const [data, setData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Fetching data from JSONPlaceholder
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                // Processing data to fit our needs
                const labels = json.slice(0, 10).map(item => `Item ${item.id}`);
                const values = json.slice(0, 10).map(item => Math.floor(Math.random() * 100));

                setData({
                    labels,
                    datasets: [
                        {
                            label: 'Quantidade de Componentes Eletrônicos',
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Dashboard de Estoque</h2>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Estoque de Componentes Eletrônicos',
                        },
                    },
                }}
            />
        </div>
    );
};

export default Dashboard;
