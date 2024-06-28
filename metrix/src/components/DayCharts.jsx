import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Sept 10',
    uv: 80000,
    pv: 40000,
    amt: 5000,
  },
  {
    name: 'Sept 11',
    uv: 40000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Sept 12',
    uv: 60000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Sept 13',
    uv: 20000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Sept 14',
    uv: 100000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Sept 15',
    uv: 10000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Sept 16',
    uv: 60000,
    pv: 2400,
    amt: 60000,
  },
];

const DayChart = () => {
  return (
    <ResponsiveContainer width={620} height={350} className="py-[20px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar type="monotone" dataKey="uv" stroke="#2563eb" fill="#5570F1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
//         <p className="text-medium text-lg">{label}</p>
//         <p className="text-sm text-primary">
//           Product 1:
//           <span className="ml-2">${payload[0].value}</span>
//         </p>
//         <p className="text-sm text-primary">
//           Product 2:
//           <span className="ml-2">${payload[1].value}</span>
//         </p>
//       </div>
//     );
//   }
// };

export default DayChart;
