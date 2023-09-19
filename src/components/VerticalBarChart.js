import "../dist/css/style.css";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
      name:"one",
      date: '2000-01',
      uv: 400,
    },
    {
      name:"two",
      date: '2000-02',
      uv: 300,
    },
    {
      name:"three",
      date: '2000-03',
      uv: 200,
    },
    {
      name:"four",
      date: '2000-04',
      uv: 278,
    },
    {
      name:"five",
      date: '2000-05',
      uv: 189,
    },
    {
      name:"six",
      date: '2000-06',
      uv: 239,
    },
    {
      name:"seven",
      date: '2000-07',
      uv: 349,
    },
    {
      name:"eight",
      date: '2000-08',
      uv: 400,
    },
  ];
  
 
export  default function VerticalBarChart() {
 
  return (
    <ResponsiveContainer width={400} height={570}>
      <BarChart
        width={600}
        height={300}
        barSize={20}
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#659C9F" />
      </BarChart>
    </ResponsiveContainer>
  );
}
