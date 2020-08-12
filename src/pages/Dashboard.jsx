import React, { useContext, useEffect, useRef } from "react";
import { DoctorContext } from "../context/DoctorContext";
import { ModalContext } from "../context/ModalContext";
import coder from "../assets/images/coder.jpg";
import { Link } from "react-router-dom";
import AddPatient from "../components/modals/AddPatient";
import { ToastContainer } from "react-toastify";

export default function Dashboard(props) {
  const context = useContext(DoctorContext);
  const modalContext = useContext(ModalContext);
  const {
    fetchPatients,
    patients,
    doctorInfo,
    fetchIndividualDoc,
    loading,
  } = context;

  const { setModalShow, modalShow, modalClose } = modalContext;
  const refModal = useRef();

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    async function initialize() {
      await fetchIndividualDoc();
      fetchPatients();
    }
    initialize();
  }, [fetchIndividualDoc, fetchPatients]);

  console.log("patients list", patients);
  const handle_view_record = async (id) => {
    try {
      //  await view_quotation(id)
      props.history.push(`/patient/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dash-grid-container bg-white">
      <header className="dash-header">
        <div className="dash-brand">
          <Link className="text-dark" to="/dashboard">
            Moyoweb
          </Link>
        </div>
        <div className="dash-header-links">
          <i className="fa fa-bars" aria-hidden="true" />
        </div>
      </header>
      <div className="row">
        <div className="col-sm-3 side-prof">
          <div className="profile-side">
            <div className="chip">
              <img src={coder} alt="Person" width={96} height={96} />
            </div>
            <div>
              <p>Dr {doctorInfo.name}</p>
            </div>
          </div>
          <div className="settings">
            <ul>
              <br />
              <br />
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Terms &amp; Conditions</Link>
              </li>
              <br />
              <br />
            </ul>
          </div>
        </div>
        {/* MAIN SECTION START */}
        <div className="col-sm-9">
          <div className="profile ml-5 mt-3">
            <div className="chip-1">
              <h4 className="font-weight-bold mb-5">Patient List</h4>
              <img src={coder} alt="Person" width={96} height={96} />
              <h6>Dr {doctorInfo.name}</h6>
              <h6>MD Cardiologist M.E.H</h6>
            </div>
            <AddPatient
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
              <i> Add Patient</i>
            </button>
            <ToastContainer />
            {patients.length === 0 && loading ? (
              <p className="mt-5 text-center">Loading Data....</p>
            ) : patients.length === 0 && !loading ? (
              <p className="mt-5 text-center">No Data Available</p>
            ) : (
              <div className="container table-responsive mt-5">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((record, index) => {
                      return (
                        <tr>
                          <th scope="row">{index}</th>
                          <td>{record.first_name}</td>
                          <td>{record.last_name}</td>
                          <td>{record.email}</td>
                          <td>{record.phone}</td>
                          <td>
                            <button
                              onClick={() => handle_view_record(record._id)}
                              type="button"
                              className="btn btn-light mr-3 ml-auto"
                            >
                              <i> Records</i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="dashboard-footer">
        <div>Email : naekuj@students.uonbi.ac.ke</div>
        <div>Tel : +245 718 592 124</div>
        <div>Copyright 2020</div>
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
  );
}
