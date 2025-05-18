
import React from 'react';
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

interface ChartProps {
  data: any[];
  height?: number;
}

// Colores consistentes para todas las gráficas
const COLORS = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#60a5fa', '#93c5fd'];

export const SimpleBarChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChartComponent
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChartComponent>
    </ResponsiveContainer>
  );
};

export const GroupedBarChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChartComponent
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="actual" fill="#3b82f6" />
        <Bar dataKey="previo" fill="#93c5fd" />
      </BarChartComponent>
    </ResponsiveContainer>
  );
};

export const SimpleLineChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const MultiLineChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="serie1" stroke="#3b82f6" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="serie2" stroke="#1e40af" />
        <Line type="monotone" dataKey="serie3" stroke="#60a5fa" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const SimplePieChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const SimpleAreaChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
