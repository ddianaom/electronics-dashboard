import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import '../index.css'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const components_max_number = 10000

const Dashboard = () => {
    const [barDataGPU, setBarDataGPU] = useState({ labels: [], datasets: [] });
    const [barDataCPU, setBarDataCPU] = useState({ labels: [], datasets: [] });
    const [barDataMotherboard, setBarDataMotherboard] = useState({ labels: [], datasets: [] });
    const [pieData, setPieData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Requisição à API JSONPlaceholder
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                const gpuNames = [
                    'NVIDIA GeForce RTX 3090',
                    'AMD Radeon RX 6900 XT',
                    'NVIDIA GeForce RTX 3080',
                    'AMD Radeon RX 6800 XT',
                    'NVIDIA GeForce RTX 3070',
                    'AMD Radeon RX 6700 XT',
                    'NVIDIA GeForce RTX 3060 Ti',
                    'AMD Radeon RX 6600 XT',
                    'NVIDIA GeForce GTX 1660 Ti',
                    'AMD Radeon RX 5500 XT'
                ];
                const gpuValues = gpuNames.map(() => Math.floor(Math.random() * components_max_number));

                setBarDataGPU({
                    labels: gpuNames,
                    datasets: [
                        {
                            label: 'Quantidade de GPUs',
                            data: gpuValues,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                });

                const cpuNames = [
                    'Intel Core i9',
                    'AMD Ryzen 9',
                    'Intel Core i7',
                    'AMD Ryzen 7',
                    'Intel Core i5',
                    'AMD Ryzen 5',
                    'Intel Core i3',
                    'AMD Ryzen 3'
                ];
                const cpuValues = cpuNames.map(() => Math.floor(Math.random() * components_max_number));

                setBarDataCPU({
                    labels: cpuNames,
                    datasets: [
                        {
                            label: 'Quantidade de CPUs',
                            data: cpuValues,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                });

                const motherboardNames = [
                    'ASUS ROG Crosshair',
                    'MSI MEG X570',
                    'Gigabyte AORUS X570',
                    'ASRock X570 Taichi',
                    'ASUS TUF Gaming B550',
                    'MSI MPG B550',
                    'Gigabyte B550 AORUS',
                    'ASRock B550 Steel Legend'
                ];
                const motherboardValues = motherboardNames.map(() => Math.floor(Math.random() * components_max_number));

                setBarDataMotherboard({
                    labels: motherboardNames,
                    datasets: [
                        {
                            label: 'Quantidade de Placas Mães',
                            data: motherboardValues,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }
                    ]
                });

                const pieLabels = ['GPU', 'CPU', 'Placa Mãe'];
                const pieValues = pieLabels.map(() => Math.floor(Math.random() * components_max_number));

                setPieData({
                    labels: pieLabels,
                    datasets: [
                        {
                            label: 'Distribuição de Componentes',
                            data: pieValues,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                            borderWidth: 1
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-row">
                <div className="chart-container">
                    <h2>Estoque de Placas Mães</h2>
                    <Bar
                        data={barDataMotherboard}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Estoque de Placas Mães',
                                },
                            },
                        }}
                    />
                </div>
                <div className="pie-chart-container">
                    <h2>Distribuição de Componentes</h2>
                    <Pie
                        data={pieData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Distribuição da Quantidade de Componentes no Estoque',
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className="dashboard-row">
                <div className="chart-container">
                    <h2>Estoque de GPUs</h2>
                    <Bar
                        data={barDataGPU}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Estoque de GPUs',
                                },
                            },
                        }}
                    />
                </div>
                <div className="chart-container">
                    <h2>Estoque de CPUs</h2>
                    <Bar
                        data={barDataCPU}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Estoque de CPUs',
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
