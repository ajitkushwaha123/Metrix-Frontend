import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Acquisition', value: 550 },
  { name: 'Purchase', value: 150 },
  { name: 'Retention', value: 300 },
];
const COLORS = ['#5570F1', '#97A5EB', '#FFCC91'];

export default class ChartPie extends PureComponent {
  render() {
    return (
      <PieChart width={400}  height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={200}
          cy={125}
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
