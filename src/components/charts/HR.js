import React,{useEffect, useContext}  from 'react'
import { Line } from 'react-chartjs-2'
import {DoctorContext} from '../../context/DoctorContext'




const HR = () => {
  const context = useContext(DoctorContext)
  const{patientData}=context
 console.log("the data", patientData)

let days = patientData.map((day)=>day.createdAt)

let sys = patientData.map((day)=>
day.heartrate===undefined?0:

day.heartrate.sys)
let dia = patientData.map((day)=>day.heartrate===undefined?0:day.heartrate.dia)
const data = {
  labels: days,
  datasets: [
    {
      label: 'Heart Rate',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
 
    return (
        <Line  data={data} />
    )
}

export default HR
