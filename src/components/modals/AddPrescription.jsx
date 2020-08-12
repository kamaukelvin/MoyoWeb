import React from "react";
import { Modal } from "react-bootstrap";
import Prescription from '../forms/Prescription'


const AddPrescription = (props) => {
  console.log("props are",props)
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
            <h5 className="text-grey">Add a Prescription</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Prescription id={props.patient_id}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddPrescription;