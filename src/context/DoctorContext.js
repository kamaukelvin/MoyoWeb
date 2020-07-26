import React, { useState, createContext } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';

const DoctorContext = createContext();
const DoctorContextProvider = (props) => {
  const history = useHistory()
  
// states

  const [patientRequests, setPatientRequests]= useState([])
  const [doctorInfo, setDoctorInfo] = useState({})
  const [loading, setLoading] = useState(false);


// handle Input Changes
  // function handleChange(evt) {
  //   const value = 
  //     evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  //   setNewUser({
  //     ...newUser,
  //     [evt.target.name]: value,
  //   });
  // }

  const fetchPatientRequests = async () => {
    setLoading(true);
    try {
      // get the token
      let token = sessionStorage.getItem("token")
      // get the response from server
      let patients_resp = await (await api_srv).getPatientRequests(token);
      console.log(" requests",patients_resp)
      setPatientRequests(patients_resp);
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

  const accept = async (patient_id,doctor_id,token) => {
    setLoading(true);
    try {
      let accept_resp = await (await api_srv).acceptRequests(patient_id,doctor_id,token);
     console.log("accept response",accept_resp)
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
     console.log("accept response",patient_data_resp)
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
        patientRequests,
        fetchPatientRequests,
        accept,
        doctorInfo,fetchIndividualDoc,
        fetchPatientData
      
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

const DoctorConsumer = DoctorContext.Consumer;
export { DoctorContextProvider, DoctorConsumer, DoctorContext };
