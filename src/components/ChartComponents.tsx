
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
  Area,
  Scatter,
  ScatterChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface ChartProps {
  data: any[];
  height?: number;
}

// Colores consistentes para todas las gráficas
const COLORS = [
  '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#60a5fa', '#93c5fd',
  '#10b981', '#059669', '#047857', '#065f46', '#34d399', '#6ee7b7',
  '#f59e0b', '#d97706', '#b45309', '#92400e', '#fbbf24', '#fcd34d'
];

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

export const SimpleScatterChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" name="X" />
        <YAxis dataKey="y" name="Y" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Datos" data={data} fill="#3b82f6" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export const SimpleRadarChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Tooltip />
        <Radar name="Valor" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export const MultiRadarChart = ({ data, height = 300 }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Tooltip />
        <Legend />
        <Radar name="Serie 1" dataKey="serie1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
        <Radar name="Serie 2" dataKey="serie2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export const BoxPlot = ({ data, height = 300 }: ChartProps) => {
  // This is a simple representation of a boxplot using bars
  // For a real boxplot, you might need a more specialized library
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChartComponent
        layout="vertical"
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="min" fill="#93c5fd" stackId="a" />
        <Bar dataKey="q1" fill="#60a5fa" stackId="a" />
        <Bar dataKey="median" fill="#3b82f6" stackId="a" />
        <Bar dataKey="q3" fill="#2563eb" stackId="a" />
        <Bar dataKey="max" fill="#1d4ed8" stackId="a" />
      </BarChartComponent>
    </ResponsiveContainer>
  );
};

export const HeatMap = ({ data, height = 300 }: ChartProps) => {
  // This is a simplified heatmap representation
  // For more complex heatmaps, use a specialized visualization library
  return (
    <div style={{ width: '100%', height: height, position: 'relative', overflow: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data[0]?.values?.length || 1}, 1fr)` }}>
        {data.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.values.map((value: number, colIndex: number) => {
              // Calculate color intensity based on value
              const intensity = Math.min(255, Math.max(0, Math.floor(value * 255)));
              const color = `rgb(${255 - intensity}, ${255 - intensity}, 255)`;
              
              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  style={{
                    backgroundColor: color,
                    padding: '12px',
                    textAlign: 'center',
                    color: intensity > 150 ? 'white' : 'black',
                    border: '1px solid rgba(0,0,0,0.1)'
                  }}
                  title={`${row.name}, ${row.columnNames[colIndex]}: ${value}`}
                >
                  {value.toFixed(2)}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        {data[0]?.columnNames?.map((name: string, index: number) => (
          <span key={`legend-${index}`} style={{ marginRight: '12px' }}>{name}</span>
        ))}
      </div>
    </div>
  );
};
