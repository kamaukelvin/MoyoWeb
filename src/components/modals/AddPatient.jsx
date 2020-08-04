import React from "react";
import { Modal } from "react-bootstrap";
import PatientForm from '../forms/NewPatient'


const AddPatient = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="text-grey">New Patient</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PatientForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddPatient;