import React from "react";
import { Modal } from "react-bootstrap";
import Prescription from '../forms/Prescription'


const AddPrescription = (props) => {
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
        <Prescription />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddPrescription;