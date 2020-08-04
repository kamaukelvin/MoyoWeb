import React, { useState, createContext } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';

const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const history = useHistory()
  
// states

  const [patients, setPatients]= useState([])
  const [doctorInfo, setDoctorInfo] = useState({})
  const [loading, setLoading] = useState(false);
  const [newPatient, setNewPatient]=useState({
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    weight:'',
    bpReadings:'',
    id:'',
    heart_rate:''

  })
  const [prescription, setPrescription]=useState({
    name:'',
    dosage:'',
    weight:'',
    height:'',
    duration:'',
  

  })
  const [patientData, setPatientData]= useState({})


// handle Input Changes
  function handlePatientChange(evt) {
    const value = evt.target.value;
    setNewPatient({
      ...newPatient,
      [evt.target.name]: value,
    });
  }

  function handlePrescriptionChange(evt) {
    const value = evt.target.value;
    setPrescription({
      ...prescription,
      [evt.target.name]: value,
    });
  }

  const fetchPatients = async () => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")
      let patients_resp = await (await api_srv).getPatients(token,doctor_id);

      console.log("patients for the doctor",patients_resp)
      setPatients(patients_resp );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };

  const fetchIndividualDoc= async () => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")

      
      let doctor_resp = await (await api_srv).getIndividualDoctor(token,doctor_id);
      console.log("doc resp",doctor_resp )
      setDoctorInfo(doctor_resp);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };

  const postPrescription= async (patient_id,weight,height,prescription) => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")

      
      let presc_resp = await (await api_srv).addPrescription(token,patient_id,doctor_id,weight,height,prescription) ;
      console.log("prescription resp",presc_resp )
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };

  const createPatient= async (newPatient) => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")

      
      let patient_resp = await (await api_srv).addPatient(token, doctor_id,newPatient) ;
      console.log(" resp from adding patient",patient_resp )
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };


  const fetchPatientData = async (token,patient_id) => {
    setLoading(true);
    try {
      let patient_data_resp = await (await api_srv).getPatientData(token,patient_id);
    
     setPatientData(patient_data_resp)
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };


  
  return (
    <DoctorContext.Provider
      value={{
        patients,
        fetchPatients,
        doctorInfo,fetchIndividualDoc,
        fetchPatientData,
        newPatient,
        handlePatientChange,
        postPrescription,
        prescription,
        handlePrescriptionChange,
        createPatient,
        loading,
        patientData
      
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

const DoctorConsumer = DoctorContext.Consumer;
export { DoctorContextProvider, DoctorConsumer, DoctorContext };
