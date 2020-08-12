import React, { useState, createContext } from "react";
import Alert from 'react-bootstrap/Alert'


const AlertsContext = createContext();
const AlertsContextProvider = (props) => {

  const [showAlert, setShowAlert] = useState(false);


  return (
    <AlertsContext.Provider
      value={{ showAlert, setShowAlert}}
    >
      {props.children}
    </AlertsContext.Provider>
  );
};

const AlertsConsumer = AlertsContext.Consumer;
export { AlertsContextProvider, AlertsConsumer, AlertsContext };
