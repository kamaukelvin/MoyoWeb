import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
    {name: 'Jan', one: 4000, two: 2400},
    {name: 'Feb', one: 3000, two: 1398},
    {name: 'March',one: 2000, two: 9800},
    {name: 'Apr', one: 2780, two: 3908},
    {name: 'May', one: 1890, two: 4800},
    {name: 'June', one: 2390, two: 3800},
    {name: 'July', one: 3490, two: 4300},
];

const BP = () => {
    return (
        <LineChart data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
   <XAxis dataKey="name"/>
   <YAxis/>
   <CartesianGrid strokeDasharray="3 3"/>
   <Tooltip/>
   <Legend />
   <Line type="monotone" dataKey="one" stroke="#8884d8" activeDot={{r: 8}}/>
   <Line type="monotone" dataKey="two" stroke="#82ca9d" />
  </LineChart>
    )
}

export default BP
