import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DoctorContext } from "../../context/DoctorContext";
const Prescription = (props) => {
  const context = useContext(DoctorContext);
  const { prescription, handlePrescriptionChange, postPrescription } = context;
  let patient_id = props.id;

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={prescription}
        validationSchema={Yup.object().shape({
          weight: Yup.string().required("Weight is required"),
          height: Yup.string().required("Height is required"),
          name: Yup.string().required("Name of medicine is required"),
          dose: Yup.string().required("Dosage is required"),
          duration: Yup.string().required("Duration is required"),
        })}
        onSubmit={() => postPrescription(patient_id, prescription)}
      >
        {({ errors, status, touched }) => (
          <Form className="">
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="weight">Weight</label>
                  <Field
                    name="weight"
                    type="text"
                    value={prescription.weight}
                    placeholder="60 kg"
                    onChange={handlePrescriptionChange}
                    className={
                      "form-control border" +
                      (errors.weight && touched.weight ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="height">Height</label>
                  <Field
                    name="height"
                    type="text"
                    value={prescription.height}
                    placeholder="175 cm"
                    onChange={handlePrescriptionChange}
                    className={
                      "form-control border" +
                      (errors.height && touched.height ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="height"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name of Prescription</label>
                <Field
                  name="name"
                  type="text"
                  value={prescription.name}
                  onChange={handlePrescriptionChange}
                  className={
                    "form-control border" +
                    (errors.name && touched.name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="invalid-feedback pl-2"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="dose">Dosage</label>
                  <Field
                    name="dose"
                    type="text"
                    value={prescription.dose}
                    onChange={handlePrescriptionChange}
                    className={
                      "form-control border" +
                      (errors.dose && touched.dose ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="dose"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="duration">Duration</label>
                  <Field
                    name="duration"
                    type="text"
                    value={prescription.duration}
                    onChange={handlePrescriptionChange}
                    className={
                      "form-control border" +
                      (errors.duration && touched.duration ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
              </div>

              <p className="text-center">
                <button
                  type="submit"
                  disabled={prescription.loading}
                  className="btn  ms-form-btn my-md-4 px-md-5 rounded-20"
                >
                  {prescription.loading && (
                    <i
                      className="fa fa-circle-notch fa-spin"
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  {prescription.loading && (
                    <span className="text-capitalize">
                      Adding Prescription...
                    </span>
                  )}

                  {!prescription.loading && (
                    <span className="text-capitalize"> Add Prescription</span>
                  )}
                </button>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Prescription;
