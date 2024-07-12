import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import "./style.css";

const LineChartArtist = ({ userid }) => {
  const [chartData, setChartData] = useState({});
  const [chartDataa, setChartDataa] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/dashboard/artist/total-by-artist-royalty/${userid}`);
        const data = response.data;

        // Extract dates and values from the data object
        const dates = Object.keys(data);
        const values = Object.values(data);

        // Format the data for ApexCharts
        const chartData = {
          options: {
            chart: {
              id: 'line-chart',
            },
            xaxis: {
              categories: dates,
              labels: {
                style: {
                  colors: 'black', // Change color of x-axis labels to black
                  rotate: -45, // Rotate labels to avoid overlap
                },
              },
              tickAmount: 10,
            },
            yaxis: {
              labels: {
                formatter: (value) => Math.floor(value), // Ensure no decimal values on y-axis
              },
            },
            colors: ['#571203'],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
          },
          series: [
            {
              name: 'Revenue',
              data: values,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:8082/dashboard/artist/total-by-artist/${userid}`);
        const data1 = response1.data;

        // Extract dates and values from the data object
        const dates1 = Object.keys(data1);
        const values1 = Object.values(data1);

        // Format the data for ApexCharts
        const chartDataa = {
          options: {
            chart: {
              id: 'line-chart',
            },
            xaxis: {
              categories: dates1,
              labels: {
                style: {
                  colors: 'black', // Change color of x-axis labels to black
                  rotate: -45, // Rotate labels to avoid overlap
                },
              },
              tickAmount: 10,
            },
            yaxis: {
              labels: {
                formatter: (value) => Math.floor(value), // Ensure no decimal values on y-axis
              },
            },
            colors: ['#571203'],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'smooth',
            },
          },
          series: [
            {
              name: 'Streams',
              data: values1,
            },
          ],
        };

        setChartDataa(chartDataa);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userid]);

  return (
    <div className="charts-container">
      <div className="chart-box">
        <h1></h1>
        {chartData.series && (
          <Chart options={chartData.options} series={chartData.series} type="line" height={500} width={800}/>
        )}
      </div>
      <div className="chart-box">
        {chartDataa.series && (
          <Chart options={chartDataa.options} series={chartDataa.series} type="line" height={500} width={800} />
        )}
      </div>
    </div>
  );
};

export default LineChartArtist;