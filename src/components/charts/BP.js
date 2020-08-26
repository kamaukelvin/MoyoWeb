import React,{useEffect, useContext}  from 'react'
import { Line } from 'react-chartjs-2'
import {DoctorContext} from '../../context/DoctorContext'
import Moment from 'react-moment'




const BP = ({id}) => {
    const context = useContext(DoctorContext)
    const{patientData}=context

    const user = patientData.filter(user=>user.patient_id===id)

  let days = user.map(day=>
    day.createdAt
    )
  
let sys = user.map((obj)=>
obj.sys===undefined?0:

obj.sys)
let dia = user.map((obj)=>obj.dia===undefined?0:obj.dia)

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
