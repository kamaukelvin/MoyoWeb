import React, { useState, createContext } from "react";
import { api_srv } from "../service";
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const AuthContextProvider = (props) => {
  const history = useHistory()
  
// states

  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });

  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone:"",
    password: "",
    confirmPassword: "",
  });

  const [userDetails,setUserDetails]=useState({})


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
    setLoading(true);
    try {
      sessionStorage.clear()
      let login_resp = await (await api_srv).login(
        user.email,
        user.password
      );
     console.log("login response", login_resp)
      sessionStorage.setItem("token",login_resp.token)
      sessionStorage.setItem("doctor_id",login_resp.doctor._id)
      setUserDetails(login_resp.doctor);
      history.push('/dashboard')
      setUser({ username: "", password: "" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setUser({ username: "", password: "" });
      let error = await err;
      console.log(error.message);
    }
  };

  // signup
  const signup = async () => {
    setLoading(true);
    try {
      setNewUser({ loading: true });
      let register_resp = await (await api_srv).register(
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phone,
        newUser.password
      );
console.log("register",register_resp)
      setNewUser({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        confirmPassword: "",
      });
      setLoading(false);
      history.push('/login')
    } catch (err) {
      setLoading(false);
      setNewUser({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone:"",
        confirmPassword: "",
      });
      let error = await err;
      console.log(error.message);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export { AuthContextProvider, AuthConsumer, AuthContext };
