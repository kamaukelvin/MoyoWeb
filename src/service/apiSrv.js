import {handle_api_error} from './errorHandler';
import axios from "axios";
let api_url = 'https://moyo-app-api.herokuapp.com/'


function register (firstName, lastName,email,phone,password,hospital, location) {
    return new Promise( async function(resolve, reject) {
        try {
          let config = {
            headers: {
             "Content-Type": "application/json",
           },
         }
         const endpoint ="doctor-register"
        
         const body = {
          
          "name": firstName + " "+ lastName,
          "hospital": hospital,
          "location": location,
          "phone": phone,
          "email": email,
          "password": password
        };
      
       
              let response = await call_post_api(endpoint,body,config)
              return resolve(response) ;
           
            }
          
        catch (err) {
        
         return reject(err)
        }
  })
  }


function login (email,password) {
    return new Promise( async function(resolve, reject) {
        try {
          let config = {
            headers: {
             "Content-Type": "application/json",
           },
         }
         const endpoint ="doctor-login"
         const body = {
            "email": email,
            "password": password
        
        };
     
              let response = await call_post_api(endpoint,body,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }

function getPatients (token,id) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`patients/${id}`
         
              let response = await call_get_api(endpoint,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }

function addPrescription (token,doctor_id,patient_id,prescription) {
    return new Promise( async function(resolve, reject) {

        try {
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }

         const body = {
        
            "patient_id": patient_id,
            "weight": prescription.weight,
            "height": prescription.height,
            "name": prescription.name,
            "dose": prescription.dose,
            "duration": prescription.duration
      
          
        };
   
         const endpoint ="presicription-data"
              let response = await call_post_api(endpoint,body,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }
function addPatient (token,doctor_id,newPatient) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }

         const body = {
          "first_name":newPatient.firstName,
          "last_name":newPatient.lastName,
          "email":newPatient.email,
          "phone":newPatient.phone,
          "id_number":newPatient.id,
          "doctor_id": doctor_id,
          "weight":newPatient.weight,
          "height":newPatient.height,
          "password": "password",
          "systolic": newPatient.systolic,
          "diastolic": newPatient.diastolic,
          "heart_rate": newPatient.heart_rate  
        };

         const endpoint ="add"
              let response = await call_post_api(endpoint,body,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }

function getIndividualDoctor (token,doctor_id) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`doctors/${doctor_id}`
              let response = await call_get_api(endpoint,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }

function getPatientData (token) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`patients-data`
        
              let response = await call_get_api(endpoint,config)
           
              return resolve(response) ;
              
            }
           
        catch (err) {
         return reject(err)
        }
  })
  }

function getPrescriptions (token, id) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`presicription-data/${id}`
        
              let response = await call_get_api(endpoint,config)
             
              return resolve(response) ;
              
            }
           
        catch (err) {
         return reject(err)
        }
  })
  }

function getIndividualUser (token,patient_id) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`users/${patient_id}`
        
              let response = await call_get_api(endpoint,config)
          
              return resolve(response) ;
              
            }
           
        catch (err) {
         return reject(err)
        }
  })
  }



async function call_post_api (endpoint,body,config) {
    return new Promise( async function(resolve, reject) {
  
      axios.post(api_url+endpoint, body, config)
      .then(function (response) {
        return resolve(response.data)
      })
      .catch(function (error) {
     
        if(error.response){
          if(error.response.status===500) {
            return reject(handle_api_error(error.response.data))
          }
        }
       else{
          return reject(error)
        }
        
      })
    })
  
  }

async function call_get_api (endpoint,config) {
    return new Promise( async function(resolve, reject) {
  
      axios.get(api_url+endpoint, config)
      .then(function (response) {
        return resolve(response.data)
      })
      .catch(function (error) {
     
        if(error.response){
          if(error.response.status===500) {
            return reject(handle_api_error(error.response.data))
          }
        }
       else{
          return reject(error)
        }
        
      })
    })
  
  }

  export {
    call_get_api,
    call_post_api,
    register,
    login,
    getPatients,
    getIndividualDoctor,
    getPatientData,
    addPrescription,
    addPatient,
    getIndividualUser,
    getPrescriptions
  }