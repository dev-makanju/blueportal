'use client';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ChartOverview = () => {
  const [chartData, setChartData] = useState([
    {
      year: '2020',
      collaboration: 0,
      downloads: 0,
    },
    {
      year: '2021',
      collaboration: 0,
      downloads: 0,
    },
    {
      year: '2022',
      collaboration: 0,
      downloads: 0,
    },
    {
      year: '2023',
      collaboration: 0,
      downloads: 0,
    },
    {
      year: '2024',
      collaboration: 0,
      downloads: 0,
    },
  ]);

  const fetchData = async () => {
    try {
      const downloadsRes = await fetch('/api/download/all');
      const downloadsData = await downloadsRes.json();
      const downloadsCount = downloadsData.length;

      const collaborationsRes = await fetch('/api/comment/all'); 
      const collaborationsData = await collaborationsRes.json();
      const collaborationsCount = collaborationsData.length;

      setChartData((prevData) =>
        prevData.map((data) =>
          data.year === '2024'
            ? { ...data, downloads: downloadsCount, collaboration: collaborationsCount }
            : data
        )
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        width={500}
        height={250}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="collaboration"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="downloads"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ChartOverview;
