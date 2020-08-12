import React, { useContext } from "react";
import { AlertsContext } from "../../context/AlertsContext";
import Alert from "react-bootstrap/Alert";

export default function WarningAlert({ message,variant }) {
  const alertsContext = useContext(AlertsContext);
  const { showAlert, setShowAlert } = alertsContext;

  if (showAlert) {
    return (
      <Alert
        variant={variant}
        onClose={() => setShowAlert(false)}
        // style={{ height: "50px" }}
        dismissible
        className={variant==="success"?`alert-success`: `alert-warning`}

      >
        <small>{message}</small>
      </Alert>
    );
  }
}
