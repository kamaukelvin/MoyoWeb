import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../context/DoctorContext";
import coder from "../assets/images/coder.jpg";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const context = useContext(DoctorContext);
  const { fetchPatientRequests, patientRequests, accept,doctorInfo,fetchIndividualDoc } = context;
  

  console.log("doc details", doctorInfo)
const token= sessionStorage.getItem("token")
  useEffect(() => {
    async function initialize() {
      await fetchIndividualDoc()
      await fetchPatientRequests();
    }
    initialize();
  }, []);

  return (
    <div className="dash-grid-container bg-white">
      <header className="dash-header">
        <div className="dash-brand">
          <a href="index.html">Moyoweb</a>
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
                <Link to="/patients">My Patient Lists</Link>
              </li>
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
              <p className>Patient Requests</p>
            </div>
            <div className="container">
              <table className="table table-hover">
                <thead>
                  {/* <tr> */}
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Patient Id</th>
                  </tr>
                </thead>
                <tbody>
                  {patientRequests.map((row) => {
     
                    return (
                      <tr id={row.patient_id}>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.patient_id}</td>

                        <td>
                          <button type="button" className="btn btn-light">
                            <i> Deny</i>
                          </button>
                          <button type="button" onClick={()=>accept(row.patient_id,doctorInfo._id,token)} className="btn btn-light mr-3">
                            <i> Accept</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
