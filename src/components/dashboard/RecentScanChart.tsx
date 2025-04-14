
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', network: 4, web: 2, crypto: 1 },
  { name: 'Tue', network: 3, web: 3, crypto: 2 },
  { name: 'Wed', network: 5, web: 1, crypto: 3 },
  { name: 'Thu', network: 2, web: 4, crypto: 2 },
  { name: 'Fri', network: 3, web: 3, crypto: 1 },
  { name: 'Sat', network: 1, web: 2, crypto: 4 },
  { name: 'Sun', network: 4, web: 3, crypto: 2 },
];

const RecentScanChart: React.FC = () => {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0affed" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0affed" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#08c5ff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#08c5ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCrypto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#50fa7b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#50fa7b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis dataKey="name" stroke="#f8f8f2" />
          <YAxis stroke="#f8f8f2" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1a1f2c", 
              borderColor: "#0affed",
              color: "#f8f8f2"
            }} 
          />
          <Area type="monotone" dataKey="network" stroke="#0affed" fillOpacity={1} fill="url(#colorNetwork)" />
          <Area type="monotone" dataKey="web" stroke="#08c5ff" fillOpacity={1} fill="url(#colorWeb)" />
          <Area type="monotone" dataKey="crypto" stroke="#50fa7b" fillOpacity={1} fill="url(#colorCrypto)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RecentScanChart;
