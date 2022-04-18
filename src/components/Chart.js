import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const Chart = ({ reports }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
      //   title: {
      //     display: true,
      //     text: 'Monthly Revenue',
      //   },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augustus',
    'September',
    'November',
    'December',
  ];

  // let data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Revenue',
  //       data: labels.map(() =>
  //         faker.datatype.number({ min: 100000, max: 1000000 })
  //       ),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //   ],
  // };

  const data = {
    labels: reports && reports.map((report) => labels[report.month - 1]),
    datasets: [
      {
        label: 'Revenue',
        data: reports && reports.map((report) => report.total),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
