import React, { useState , useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSalesForGraph , getCustomerForGraph } from '../helper/helper';
// const data = [
//   {
//     name: 'Sept 10',
//     uv: 80000,
//     pv: 40000,
//     amt: 5000,
//   },
//   {
//     name: 'Sept 11',
//     uv: 40000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Sept 12',
//     uv: 60000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Sept 13',
//     uv: 20000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Sept 14',
//     uv: 100000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Sept 15',
//     uv: 10000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Sept 16',
//     uv: 60000,
//     pv: 2400,
//     amt: 60000,
//   },
// ];

const DayChart = ({select}) => {
  console.log("select" , select);
  const OrderAPI = "http://localhost:8000/api/orders";
  const API = "http://localhost:8000/api/customer";

   const [sales, setSales] = useState([]);
   const [customer , setCustomer] = useState([]);

   const fetchSalesData = async (OrderAPI) => {
     const data = await getSalesForGraph(OrderAPI);
     console.log("dattttttttte", data);
     setSales(data.data);
     console.log("dmlskcl", sales);
   };

   const fetchCustomerData = async (API) => {
     const {data} = await getCustomerForGraph(API);
     console.log("customerrrrr", data);
     setCustomer(data);
     console.log("customerskljld", customer);
   };

   useEffect(() => {
     fetchSalesData(OrderAPI);
     fetchCustomerData(API);
   }, [OrderAPI , API]);

  return (
    <div>
      {select === "sales" && (
        <ResponsiveContainer width={620} height={350} className="py-[20px]">
          <BarChart data={sales}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              dataKey="totalSales"
              stroke="#2563eb"
              fill="#5570F1"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
      {select === "order" && (
        <ResponsiveContainer width={620} height={350} className="py-[20px]">
          <BarChart data={sales}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              dataKey="totalOrders"
              stroke="#2563eb"
              fill="#5570F1"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
      {select === "customers" && (
        <ResponsiveContainer width={620} height={350} className="py-[20px]">
          <BarChart data={customer}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              dataKey="totalCustomers"
              stroke="#2563eb"
              fill="#5570F1"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
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
