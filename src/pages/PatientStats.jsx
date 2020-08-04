import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import pic from "../assets/images/pic.png";
import { DoctorContext } from "../context/DoctorContext";
import { ModalContext } from "../context/ModalContext";
import { Link } from "react-router-dom";
import AddPrescription from "../components/modals/AddPrescription";

const PatientStats = (props) => {
  const context = useContext(DoctorContext);
  const {
    fetchPatientData,
    fetchIndividualDoc,
    doctorInfo,
    patientData,
  } = context;
  const modalContext = useContext(ModalContext);
  const refModal = useRef();

  const { setModalShow, modalShow, modalClose } = modalContext;
  useEffect(() => {
    async function initialize() {
      await fetchIndividualDoc();
      await fetchPatientData(
        sessionStorage.getItem("token"),
        props.match.params.id
      );
    }
    initialize();
  }, []);
  let weight = patientData.weight;
  let height = patientData.height;

  let bmi = weight / ( Math.pow(height/100, 2));

  function bmi_status(weight, height) {
    let bmi = weight / height ** 2;

    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 25) {
      return "Normal";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }

  return (
    <div className="container-fluid bg-white">
      {/* TOP SECTION START */}
      <section className="top-section">
        <Link to="/dashboard">
          <div className="logo">
            <div className="row">
              <div className="col-md-4">
                <img src={logo} alt="logo" />
              </div>
              <div className="col-md-8">
                <h5 className="text-dark">Moyoweb</h5>
              </div>
            </div>
          </div>
        </Link>
        <div>
          <img className="top-img pl-4" src={pic} alt="logo" />
          <h6>Dr {doctorInfo.name}</h6>
        </div>
      </section>
      {/* TOP SECTION END */}
      <section className="container-fluid">
        <div className="row">
          {/* SIDE SECTION START */}
          <div className="col-md-2 seperator">
            <section className="side">
              <div className="side-Prescriptions">
                <img className="side-img mb-1" src="./img/pic.png" alt="" />
                <h6>
                  Patient {patientData.first_name} {patientData.last_name}
                </h6>
              </div>
              <div className="middle-part">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-dash-tab"
                    data-toggle="pill"
                    href="#v-pills-dash"
                    role="tab"
                    aria-controls="v-pills-dash"
                    aria-selected="true"
                  >
                    Dashboard
                  </a>
                  <a
                    className="nav-link "
                    id="v-pills-records-tab"
                    data-toggle="pill"
                    href="#v-pills-records"
                    role="tab"
                    aria-controls="v-pills-records"
                    aria-selected="false"
                  >
                    Records
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-prescription-tab"
                    data-toggle="pill"
                    href="#v-pills-prescription"
                    role="tab"
                    aria-controls="v-pills-prescription"
                    aria-selected="false"
                  >
                    Prescription
                  </a>
                </div>
              </div>
              <div className="lower-part">
                <p>Settings</p>
                <p>Privacy Policy</p>
                <p>T &amp; C</p>
              </div>
            </section>
          </div>
          {/* MAIN SECTION START */}
          <div className="col-md-10">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade "
                id="v-pills-records"
                role="tabpanel"
                aria-labelledby="v-pills-records-tab"
              >
                <div className="prescription ml-5 mt-3">
                  <div className="records" style={{ width: "100%" }}>
                    <p className="font-weight-bold">Patients What Records</p>
         
                  </div>
                </div>
                <div className="container-x">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Systolic/Diastolic Pressure</th>
                        <th>Heart Rate</th>
                        <th>Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                      <tr>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-prescription"
                role="tabpanel"
                aria-labelledby="v-pills-prescription-tab"
              >
                <div className="prescriptions" style={{ width: "100%" }}>
                  <h4
                    className="font-weight-bold mb-5"
                    style={{ marginTop: 50 }}
                  >
                    Previous Prescriptions
                  </h4>
                  <AddPrescription
                    show={modalShow}
                    onHide={modalClose}
                    refModal={refModal}
                  />
                  <button
                    onClick={() => setModalShow(true)}
                    type="button"
                    className="btn btn-light float-right btn-t mr-3"
                    style={{ marginTop: "-40px" }}
                  >
                    <i> Add A Prescription</i>
                  </button>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Medicine Name</th>
                      <th>Dosage</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td></td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td></td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td></td>
                    </tr>
                    <tr>
                      <td />
                      <td />
                      <td />
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="tab-pane fade show active"
                id="v-pills-dash"
                role="tabpanel"
                aria-labelledby="v-pills-dash-tab"
              >
                <div>
                  <div className="profile ml-5 mt-3">
                    <div className="records" style={{ width: "100%" }}>
                      <h5>
                        Patient{" "}
                        <span className="font-weight-bold">
                          <i>
                            {patientData.first_name} {patientData.last_name}
                          </i>
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="container-x">
                    <div className="readings">
                    <div className="row">
                    <div className="col-md-3">
                      <div className="container-left">
                        <p className="pt-3">Blood Pressure</p>
                        <h3 className="text-center">
                          {patientData.systolic_diastolic}
                        </h3>
                      </div>
                      </div>
                      <div className="col-md-3">
                      <div className="container-left">
                        <p className="pt-3">Heart Rate</p>
                        <h3 className="text-center">
                          {patientData.heart_rate}
                        </h3>
                      </div>
                      </div>
                      <div className="col-md-3">
                      <div className="container-right">
                        <p className="pl-3 pt-3">
                          Weight:{" "}
                          <span className="font-weight-bold">
                            {patientData.weight} kg
                          </span>
                        </p>
                        <p className="pl-3 mb-2">
                          Height:{" "}
                          <span className="font-weight-bold">
                            {patientData.height} cm
                          </span>
                        </p>
                        <p className="pl-3 mb-0 ">
                          B M I: <span className="font-weight-bold">{bmi}</span>
                        </p>
                      </div>
                      </div>
                      <div className="col-md-3">
                      <div className="container-left">
                        <p className="pt-3">BMI Status</p>
                        <h5 className="text-center">
                         underweight
                        </h5>
                      </div>
                      </div>
                      </div>
                    </div>
                    <div className="record-days">
                      <ul>
                        <li>BP</li>
                      </ul>
                      <div className="container-down">
                        <p>BP / Days</p>
                      </div>
                      <ul>
                        <li>HR</li>
                      </ul>
                      <div className="container-down">
                        <p>HR / Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER SECTION START */}
            <footer className="footer">
              <div>Email : naekuj@students.uonbi.ac.ke</div>
              <div>Tel : +245 718 592 124</div>
              <div>Copyright © 2020</div>
              <div className="social-icons">
                <a href>
                  <i className="fab fa-twitter" />
                </a>
                <a href>
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href>
                  <i className="fab fa-github" />
                </a>
                <a href>
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientStats;
