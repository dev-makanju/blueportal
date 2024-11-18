'use client'
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ChartOverview = () => {
    const data = [
        {
          "year": "2016",
          "Collaboration": 4000,
          "Activities": 2400
        },
        {
          "year": "2017",
          "Collaboration": 3000,
          "Activities": 1398
        },
        {
          "year": "2018",
          "Collaboration": 2000,
          "Activities": 9800
        },
        {
          "year": "2019",
          "Collaboration": 2780,
          "Activities": 3908
        },
        {
          "year": "2020",
          "Collaboration": 1890,
          "Activities": 4800
        },
        {
          "year": "2021",
          "Collaboration": 2390,
          "Activities": 3800
        },
        {
          "year": "2022",
          "Collaboration": 3490,
          "Activities": 4300
        }
    ]
    
    return (
    <ResponsiveContainer width="100%" height="100%" >
        <AreaChart width={730} height={250} data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <Area type="monotone" dataKey="Iphone" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="Samsung" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
    </ResponsiveContainer>
    )
}

export default ChartOverview