import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AlertsContext } from "../context/AlertsContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "../components/alerts/WarningAlert";

export default function Login() {
  const context = useContext(AuthContext);
  const { user, handleLoginChange, login,  alert } = context;
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
                <h3 className="text-center text-white  pt-md-5 pb-md-5">
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
              <div className="col-md-6 offset-md-1">
                <Formik
                  enableReinitialize
                  initialValues={user}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Please enter a valid email")
                      .required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                  onSubmit={() => login()}
                >
                  {({ errors, status, touched }) => (
                    <Form className="ms-form">
                      <div className="card-body px-md-5">
                        <h3 className="text-center pb-3">
                          <u>Log In</u>
                        </h3>
                        {showAlert && <Alert message={message} variant={variant}/>}
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            value={user.email}
                            onChange={handleLoginChange}
                            type="email"
                            className={
                              "form-control border" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="example@email.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="Password">Password</label>
                          <input
                            name="password"
                            value={user.password}
                            onChange={handleLoginChange}
                            type="password"
                            className={
                              "form-control border" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="********"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remember"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remember"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <Link to="" className="float-right">
                          Forgot Password?
                        </Link>
                        <div className="clearfix" />
                        <p className="text-center">
                          <button
                            type="submit"
                            className="btn  ms-form-btn my-md-4 px-md-5 rounded-20"
                            disabled={user.loading}
                          >
                            {user.loading && (
                              <i
                                className="fa fa-circle-notch fa-spin"
                                style={{ marginRight: "5px" }}
                              />
                            )}
                            {user.loading && (
                              <span className="text-capitalize">
                                Logging In...
                              </span>
                            )}

                            {!user.loading && (
                              <span className="text-capitalize"> LogIn</span>
                            )}
                          </button>
                        </p>
                        <p className="text-center">
                          Don't have an account <Link to="/">Signup</Link>
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
