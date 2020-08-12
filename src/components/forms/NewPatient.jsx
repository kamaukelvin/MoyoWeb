import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DoctorContext } from "../../context/DoctorContext";
const NewPatient = () => {
  const context = useContext(DoctorContext);
  const { newPatient, handlePatientChange, loading, createPatient } = context;

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={newPatient}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Please enter a valid email")
            .required("Email is required"),
          phone: Yup.string().required("Phone is required"),
          weight: Yup.string().required("Weight is required"),
          height: Yup.string().required("Height is required"),
          bpReadings: Yup.string().required("Bp Readings are required"),
          id: Yup.number().required("ID Number is required"),
          heart_rate: Yup.number().required("Heart rate is required"),
        })}
        onSubmit={() => createPatient(newPatient)}
      >
        {({ errors, status, touched }) => (
          <Form className="">
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="First Name">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    value={newPatient.firstName}
                    placeholder="Jane"
                    onChange={handlePatientChange}
                    className={
                      "form-control border" +
                      (errors.firstName && touched.firstName
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="Last Name">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    value={newPatient.lastName}
                    placeholder="Doe"
                    onChange={handlePatientChange}
                    className={
                      "form-control border" +
                      (errors.lastName && touched.lastName ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email</label>
                <Field
                  name="email"
                  type="text"
                  value={newPatient.email}
                  onChange={handlePatientChange}
                  className={
                    "form-control border" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback pl-2"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <Field
                  name="phone"
                  type="text"
                  value={newPatient.phone}
                  onChange={handlePatientChange}
                  className={
                    "form-control border" +
                    (errors.phone && touched.phone ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="invalid-feedback pl-2"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">ID Number</label>
                <Field
                  name="id"
                  type="text"
                  value={newPatient.id}
                  onChange={handlePatientChange}
                  className={
                    "form-control border" +
                    (errors.id && touched.id ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="id"
                  component="div"
                  className="invalid-feedback pl-2"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="weight">Weight</label>
                  <Field
                    name="weight"
                    type="text"
                    value={newPatient.weight}
                    onChange={handlePatientChange}
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
                    value={newPatient.height}
                    onChange={handlePatientChange}
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
                <div className="form-group col-md-6">
                  <label htmlFor="weight">Systolic_diastolic</label>
                  <Field
                    name="bpReadings"
                    type="text"
                    value={newPatient.bpReadings}
                    onChange={handlePatientChange}
                    className={
                      "form-control border" +
                      (errors.bpReadings && touched.bpReadings
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="bpReadings"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="heart_rate">Heart Rate</label>
                  <Field
                    name="heart_rate"
                    type="text"
                    value={newPatient.heart_rate}
                    onChange={handlePatientChange}
                    className={
                      "form-control border" +
                      (errors.heart_rate && touched.heart_rate
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="heart_rate"
                    component="div"
                    className="invalid-feedback pl-2"
                  />
                </div>
              </div>

              <p className="text-center">
                <button
                  type="submit"
                  disabled={newPatient.loading}
                  className="btn  ms-form-btn my-md-4 px-md-5 rounded-20"
                >
                  {newPatient.loading && (
                    <i
                      className="fa fa-circle-notch fa-spin"
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  {newPatient.loading && (
                    <span className="text-capitalize">Creating Patient...</span>
                  )}

                  {!newPatient.loading && (
                    <span className="text-capitalize"> Create Patient</span>
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

export default NewPatient;
