import React, { useState, createContext, useContext, useEffect } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';
import { AlertsContext } from "./AlertsContext";

const AuthContext = createContext();
const AuthContextProvider = (props) => {
  const history = useHistory()
  const alertsContext = useContext(AlertsContext);
  const { setShowAlert, showAlert } = alertsContext;


  
// states

  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
    loading: false
  });

  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
    hospital:'',
    location:'',
    loading: false
  });

  const [userDetails,setUserDetails]=useState({})
  const [alert, setAlert] = useState({
    message: "",
    variant: "",
  });

    useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [alert, setShowAlert, showAlert]);

// handle Input Changes
  function handleChange(evt) {
    const value = 
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setNewUser({
      ...newUser,
      [evt.target.name]: value,
    });
  }

  function handleLoginChange(evt) {
    const value = 
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  }

  function toggleRememberMe() {
    setUser({ ...user, rememberMe: !user.rememberMe });
  }
  function toggleShowPassword() {
    setUser({ ...user, showPassword: !user.showPassword });
  }


  // LogIn
  const login = async () => {
    setUser({...user, loading:true})
    try {
      sessionStorage.clear()
      let login_resp = await (await api_srv).login(
        user.email,
        user.password
      );
 
      sessionStorage.setItem("token",login_resp.token)
      sessionStorage.setItem("doctor_id",login_resp.doctor._id)
      setUserDetails(login_resp.doctor);
      setUser({...user, loading:false})
      history.push('/dashboard')
      setUser({ 
        username: "", 
        password: ""
       });
     

    } catch (err) {

      setUser({...user, loading:false})
    
      setUser({ 
        username: "",
        password: "" });
      let error = await err;
      setShowAlert(true);
      setAlert({ ...alert, message: error.message, variant: "danger" });

    }
  };

  // signup
  const signup = async () => {
    setNewUser({...newUser, loading:true})
    try {
   
      let register_resp = await (await api_srv).register(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phone,
        newUser.password,
        newUser.hospital,
        newUser.location

      );
 
         setNewUser({...newUser, loading:false})
      history.push('/login')
    }
    
    catch (err) {
         setNewUser({...newUser, loading:false})
      setNewUser({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone:"",
        confirmPassword: "",
        location:'',
        hospital:""
      });
      let error = await err;
      console.log("error is", JSON.stringify(error))
      // console.log("error is", JSON.stringify(error.message))
      // setAlert({ ...alert, message: error.message, variant: "danger" });
      setShowAlert(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        newUser,
        handleChange,
        handleLoginChange,
        toggleRememberMe,
        toggleShowPassword,
        signup,
        login,
        loading,
        userDetails,
        alert, setAlert
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthContextProvider, AuthConsumer, AuthContext };
