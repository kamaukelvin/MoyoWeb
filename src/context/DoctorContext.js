import React, { useState, createContext, useContext } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';
import {ModalContext} from '../context/ModalContext'

import {toast, cssTransition  } from 'react-toastify';


const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const history = useHistory()
  
 const modalContext = useContext(ModalContext)
 const {modalClose}= modalContext

//  toast animation
 const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
});


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
    heart_rate:'',
    id:'',
    systolic:'',
    diastolic:'',
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
  const [patientData, setPatientData]= useState([])
  const [individualUser, setIndividualUser]= useState("")
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
     
      setDoctorInfo(doctor_resp);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };

  const fetchIndividualUser= async (patient_id) => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      let individual_resp = await (await api_srv).getIndividualUser(token,patient_id);
  
      setIndividualUser(individual_resp );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let error = await err;
      console.log(error.message);
    }
  };

  const postPrescription= async (patient_id,prescription) => {
    setPrescription({...prescription, loading:true});
    try {
      console.log("prescription resp",patient_id)
      // get the token
      let token = sessionStorage.getItem("token")
      let doctor_id = sessionStorage.getItem("doctor_id")
      
      let presc_resp = await (await api_srv).addPrescription(token,doctor_id,patient_id ,prescription) ;
  
      setPrescription({...prescription, loading:false});
      modalClose()
      toast.success("Prescription added successfully", {
        transition: Zoom,
      })
    } catch (err) {
      setPrescription({...prescription, loading:false});
      let error = await err;
      modalClose()
      toast.error("Prescription could not be added, please try again", {
        transition: Zoom,
      })
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
      toast.success("Patient added successfully", {
        transition: Zoom,
      })
    } catch (err) {
      setNewPatient({...newPatient, loading:false})
      let error = await err;
      modalClose()
      toast.error("Patient could not be added, please try again", {
        transition: Zoom,
      })
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
        patientData,
        show, setShow,
        fetchIndividualUser,
        individualUser
      
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

const DoctorConsumer = DoctorContext.Consumer;
export { DoctorContextProvider, DoctorConsumer, DoctorContext };
