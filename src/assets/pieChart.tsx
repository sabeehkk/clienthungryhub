/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  const [chartData, setChartData] = useState<any>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
    </div>
  );
};

export default PieChart;
