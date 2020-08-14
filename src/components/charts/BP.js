import React,{useEffect, useContext}  from 'react'
import { Line } from 'react-chartjs-2'
import {DoctorContext} from '../../context/DoctorContext'
import Moment from 'react-moment'




const BP = () => {
    const context = useContext(DoctorContext)
    const{patientData}=context
   console.log("the data", patientData)
  let xAxis=[]
  let days = patientData.map((day)=>day.createdAt)
  
let sys = patientData.map((day)=>
day.heartrate===undefined?0:

day.heartrate.sys)
let dia = patientData.map((day)=>day.heartrate===undefined?0:day.heartrate.dia)

    const data = {
        labels: days,
        datasets: [
          {
            label: 'diastolic',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#ad4ef5',
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
            data: dia
          },
          {
            label: 'systolic',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: '#716ef5',
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
            data: sys
          }
        ]
      };
    
 
    return (
        <Line  data={data} />
    )
}

export default BP
