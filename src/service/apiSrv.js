import {handle_api_error} from './errorHandler';
import axios from "axios";
let api_url = 'https://moyo-app-api.herokuapp.com/'


function register (firstName, lastName,email,phone,password) {
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
          "hospital": "Kenyatta",
          "location": "Yaya Center",
          "phone": phone,
          "email": email,
          "password": password
        };
       console.log("signup body", body)
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
      console.log("login body", body)
              let response = await call_post_api(endpoint,body,config)
              return resolve(response) ;
           
            }
        catch (err) {
         return reject(err)
        }
  })
  }

function getPatientRequests (token) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint ="request-doctor"
              let response = await call_get_api(endpoint,config)
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

function getPatientData (token,patient_id) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint =`patient-data/${patient_id}`
         console.log("to send",config, endpoint)
              let response = await call_get_api(endpoint,config)
              return resolve(response) ;
              
            }
           
        catch (err) {
         return reject(err)
        }
  })
  }

function acceptRequests (patient_id,doctor_id,token) {
    return new Promise( async function(resolve, reject) {
        try {
      
          let config = {
            headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
         const endpoint ="accept-requests"
         const body = {
          "patient_id": patient_id,
          "doctor_id": doctor_id,
          "status": true
      
      };
              let response = await call_post_api(endpoint,body,config)
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
    getPatientRequests,
    acceptRequests,
    getIndividualDoctor,
    getPatientData
  }