import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AlertsContext } from "../context/AlertsContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "../components/alerts/WarningAlert";

export default function Signup() {
  const context = useContext(AuthContext);
  const { newUser, handleChange, signup, loading } = context;

  const {message,variant}= alert
  const alertsContext = useContext(AlertsContext)

  // destructure

  const{showAlert}= alertsContext

  return (
    <div className="grid-container">
      <Navbar />
      <main className="main">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-5 px-md-4">
                <h3 className="text-center text-white mt-md-5 pt-md-5 pb-md-5">
                  <u>Moyoweb</u>
                </h3>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed,
                  pariatur. Recusandae eius consequuntur minus at. Ipsum
                  obcaecati, et quod cupiditate maxime vitae nulla doloremque
                  veniam consequatur est sint non consectetur.
                </p>
                <br />
                <br />
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed,
                  pariatur. Recusandae eius consequuntur minus at. Ipsum
                  obcaecati, et quod cupiditate maxime vitae nulla doloremque
                  veniam consequatur est sint non consectetur.
                </p>
              </div>
              <div className="col-md-7">
                <Formik
                  enableReinitialize
                  initialValues={newUser}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required("First Name is required"),
                    lastName: Yup.string().required("Last Name is required"),
                    email: Yup.string()
                      .email("Please enter a valid email")
                      .required("Email is required"),
                    phone: Yup.string()
                      .required("Phone is required"),
                    hospital: Yup.string()
                      .required("Hospital name is required"),
                    location: Yup.string()
                      .required("Location is required"),
                    password: Yup.string()
                      .min(6, "Password must be atleast 6 characters")
                      .required("Password is required"),
                    confirmPassword: Yup.string()
                      .oneOf([Yup.ref("password")], "Passwords do not match")
                      .required("Confirm password is required"),
                  })}
                  onSubmit={() => signup()}
                >
                  {({ errors, status, touched }) => (
                    <Form className="ms-form">
                      <div className="card-body px-md-5">
                        <h3 className="text-center pb-3">
                          <u>Create Account</u>
                        </h3>
                        {showAlert && <Alert message={message} variant={variant}/>}
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="First Name">First Name</label>
                            <Field
                              name="firstName"
                              type="text"
                              value={newUser.firstName}
                              placeholder="Jane"
                              onChange={handleChange}
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
                              value={newUser.lastName}
                              placeholder="Doe"
                              onChange={handleChange}
                              className={
                                "form-control border" +
                                (errors.lastName && touched.lastName
                                  ? " is-invalid"
                                  : "")
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
                            value={newUser.email}
                            onChange={handleChange}
                            className={
                              "form-control border" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
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
                            value={newUser.phone}
                            onChange={handleChange}
                            className={
                              "form-control border" +
                              (errors.phone && touched.phone
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="invalid-feedback pl-2"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Hospital Name</label>
                          <Field
                            name="hospital"
                            type="text"
                            value={newUser.hospital}
                            onChange={handleChange}
                            className={
                              "form-control border" +
                              (errors.hospital && touched.hospital
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="hospital"
                            component="div"
                            className="invalid-feedback pl-2"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="location">Location</label>
                          <Field
                            name="location"
                            type="text"
                            value={newUser.location}
                            onChange={handleChange}
                            className={
                              "form-control border" +
                              (errors.location && touched.location
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="location"
                            component="div"
                            className="invalid-feedback pl-2"
                          />
                        </div>
                     
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            className={
                              "form-control border password-input" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                            id="Password"
                            placeholder="********"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <input
                            name="confirmPassword"
                            value={newUser.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            className={
                              "form-control border" +
                              (errors.confirmPassword && touched.confirmPassword
                                ? " is-invalid"
                                : "")
                            }
                            id="confirmPassword"
                            placeholder="*********"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <p className="text-center">
                          <button
                            type="submit"
                            disabled={newUser.loading}
                            className="btn  ms-form-btn my-md-4 px-md-5 rounded-20"
                          >
                            {newUser.loading && (
                              <i
                                className="fa fa-circle-notch fa-spin"
                                style={{ marginRight: "5px" }}
                              />
                            )}
                            {newUser.loading && (
                              <span className="text-capitalize">
                                Creating User...
                              </span>
                            )}

                            {!newUser.loading && (
                              <span className="text-capitalize">
                                {" "}
                                Create Account
                              </span>
                            )}
                          </button>
                        </p>
                        <p className="text-center">
                          Already have an account <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
