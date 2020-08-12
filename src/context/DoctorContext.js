import React, { useState, createContext, useContext } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';
import {ModalContext} from '../context/ModalContext'

import {toast } from 'react-toastify';


const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const history = useHistory()
  
 const modalContext = useContext(ModalContext)
 const {modalClose}= modalContext

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
    heart_rate:'',
    loading: false

  })
  const [prescription, setPrescription]=useState({
    name:'',
    weight:'',
    height:'',
    duration:'',
    dose:'',
    loading:false
  

  })
  const [patientData, setPatientData]= useState({})
  const [show, setShow] = useState(false);

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

  const postPrescription= async (id,prescription) => {
    setPrescription({...prescription, loading:true});
    try {
    
      // get the token
      let token = sessionStorage.getItem("token")

      
      let presc_resp = await (await api_srv).addPrescription(token,id,prescription) ;
  
      setPrescription({...prescription, loading:false});
      modalClose()
      toast.success("Prescription added successfully")
    } catch (err) {
      setPrescription({...prescription, loading:false});
      let error = await err;
      modalClose()
      toast.error("Prescription could not be added, please try again")
      console.log(error.message);
    }
  };

  const createPatient= async (newPatient) => {
    setNewPatient({...newPatient, loading:true})
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")

      
      let patient_resp = await (await api_srv).addPatient(token, doctor_id,newPatient) ;
     
      setNewPatient({...newPatient, loading:false})
      modalClose()
      toast.success("Patient added successfully")
    } catch (err) {
      setNewPatient({...newPatient, loading:false})
      let error = await err;
      modalClose()
      toast.error("Patient could not be added, please try again")
      console.log(error.message);
    }
  };


  const fetchPatientData = async (token,patient_id) => {
    setLoading(true);
    try {
      let patient_data_resp = await (await api_srv).getPatientData(token,patient_id);
    console.log("patient data response",patient_data_resp )
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
        patientData,
        show, setShow
      
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

const DoctorConsumer = DoctorContext.Consumer;
export { DoctorContextProvider, DoctorConsumer, DoctorContext };
