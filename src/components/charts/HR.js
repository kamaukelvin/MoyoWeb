import React,{useEffect, useContext}  from 'react'
import { Line } from 'react-chartjs-2'
import {DoctorContext} from '../../context/DoctorContext'




const HR = ({id}) => {
  const context = useContext(DoctorContext)
  const{patientData}=context
  const user = patientData.filter(user=>user.patient_id===id)


let days = user.map((day)=>day.createdAt)

let heart_rate =user.map((obj)=>{

  return(
    obj.heart_rate
  )

})


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
      data: heart_rate
    }
  ]
};
 
    return (
        <Line  data={data} />
    )
}

export default HR
