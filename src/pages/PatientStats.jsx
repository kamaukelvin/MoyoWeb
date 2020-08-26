import React, { useContext, useEffect, useRef } from "react";
import logo from "../assets/images/logo.png";
import pic from "../assets/images/pic.png";
import Logout from "../assets/images/logout.png";
import { DoctorContext } from "../context/DoctorContext";
import { ModalContext } from "../context/ModalContext";
import { Link, useHistory } from "react-router-dom";
import AddPrescription from "../components/modals/AddPrescription";
import { ToastContainer,cssTransition } from "react-toastify";
import Moment from 'react-moment'
import BP from '../components/charts/BP'
import HR from '../components/charts/HR'

const PatientStats = (props) => {
  const context = useContext(DoctorContext);
  const {
    fetchPatientData,
    fetchIndividualDoc,
    fetchIndividualUser,
    doctorInfo,
    patientData,
    show,
    individualUser,
    loading,
    fetchPrescriptions,
    medication
  } = context;
  const modalContext = useContext(ModalContext);
  const refModal = useRef();
  const history = useHistory()

  const { setModalShow, modalShow, modalClose } = modalContext;
  useEffect(() => {
    async function initialize() {
      await fetchIndividualDoc();
      await  fetchIndividualUser(props.match.params.id)
      await fetchPatientData(
        sessionStorage.getItem("token"),
    
      );
      await fetchPrescriptions(sessionStorage.getItem("token"),props.match.params.id)
     
    }
    initialize();
  }, []);

 const user = patientData.filter(user=>user.patient_id===props.match.params.id)

 let bmi = individualUser.weight / Math.pow(individualUser.height / 100, 2)

//  let weight = individualUser.weight;
//  let height = individualUser.height;

//  let bmi = weight / Math.pow(height / 100, 2);

const signout =()=>{
  localStorage.clear()
  history.push('/')

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
        <div>
          <Link onClick={signout} >
            <img src={Logout} alt="logout" style={{height:'20px', width:'20px', margin:'auto'}}/>
            <small className="d-block font-weight-bold text-dark"> Sign Out</small></Link>
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
                  Patient {individualUser.first_name} {individualUser.last_name}
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
                    <p className="font-weight-bold">
                      Patient {individualUser.first_name} {individualUser.last_name}{" "}
                      Records
                    </p>
                  </div>
                </div>
                <div className="container-x">
                {patientData.length===0 && loading ? <p className="text-center pt-5">Loading data...</p>: patientData.length===0 && !loading ? <p className="text-center">No data currently...</p>:
                    
<>

                  <table className="table table-hover">
 
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Heart Rate</th>
                        <th>Height (cm)</th>
                        <th>Weight (kg)</th>
                        <th>Level</th>
                      </tr>
                    </thead>
                    <tbody>
                   
                   {user.map((row,i)=>{
                        return(
                       
                          <tr key={i}>
                          <td><Moment format="DD MMM YYYY" date={row.createdAt} /></td>                      
                          <td>
                        { row.heart_rate}
   
                          </td>
                          <td>{row.height}</td>
                          <td>{row.weight}</td>
                          <td>

                            {row === undefined ? null:
                            (row.sys>=70 && row.sys<=90) && (row.dia>=90 && row.dia<=60) ? <p className="text-info">LOW</p>:
                            (row.sys>=90 && row.sys<=120) && (row.dia>=60 && row.dia<=80) ? <p className="text-success">NORMAL</p>:
                            (row.sys>=120 && row.sys<=140) && (row.dia>=80 && row.dia<=90) ? <p className="text-warning">PRE-HIGH</p>:
                            (row.sys>=140 && row.sys<=190) && (row.dia>=90 && row.dia<=100) ? <p className="text-danger">HIGH</p>: null

                            
                            }
                          </td>
                        </tr>
                        )
                      })}
                 
                    </tbody>
                  </table>
                    </>
                    }
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
                    patient_id={props.match.params.id}
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
                <ToastContainer />
                {medication.length===0 && loading ? <p className="text-center m-auto pt-5">Loading Prescriptions...</p>: medication.length===0 && !loading ? <p className="text-center">No data currently...</p>:
              
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
                 { medication.map((rec,i)=>{
                      return(
                        <tr key={i}>
                        <td>
                        <Moment
                            format="DD MMM YYYY"
                            date={
                              rec.createdAt
                            }/>
                          </td>
                      <td>{rec.name}</td>
                      <td>{rec.dose}</td>
                        <td>{rec.duration}</td>
                      </tr>
                   
                      )

})}
                  
                  </tbody>
                </table>
                }
              </div>

              {
                individualUser==="" && loading?<p className="text-center m-auto pt-5">Loading Patient Data...</p>: individualUser==="" && !loading? <p className="text-center m-auto pt-5">No Data to display</p>:
   <>
              
            
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
                              {individualUser.first_name} {individualUser.last_name}
                            </i>
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="container-x">
                      <div className="readings">
                        <div className="row">
                          {
                           user.map((rec,i)=>{
                             let recLength=user.length
                             if (recLength === i + 1) {
                               return(
                                <>
                                <div className="col-md-3">
                                  <div className="container-left">
                                  <p className="pt-3 mb-1"><b>Heart Rate</b></p>
                                    <h3 className="text-center">
                                      {rec.heart_rate}
                                    </h3>
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="container-left">
                                  <p className="pt-3 mb-1"><b>Blood Pressure</b></p>
                    
                                    <div >
                                      <p className="">
                                      Systolic rate:{" "}
                                      <span className="font-weight-bold">
                                        {rec.sys} 
                                      </span>
                                    </p>
                                    <p className="">
                                      Dystolic Rate:{" "}
                                      <span className="font-weight-bold">
                                      {rec.dia} 
                                      </span>
                                    </p>
                                    </div>
              
                                  
                                  </div>
                                </div>
                                </>
                               )
                           }else{
                             return null
                           }
                           
                          })
                         
}
                          <div className="col-md-3">
                            <div className="container-left">
                            <p className="pt-2 mb-1 font-weight-bold">BMI</p>
                            {
                             

  
                              <div >
                                <p className="mb-1">
                                Weight:{" "}
                                <span className="font-weight-bold">
                                  {individualUser.weight} 
                                </span>
                              </p>
                              <p className="mb-1">
                              Height:{" "}
                                <span className="font-weight-bold">
                                {individualUser.height} 
                                </span>
                              </p>
                              
                              <p className="mb-0 ">
                                B M I:{" "}
                                <span className="font-weight-bold">{Math.round((bmi + Number.EPSILON) * 100) / 100}</span>
                              </p>
                              </div>
}
                          
                       
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="container-left">
                              <p className="pt-3 font-weight-bold">BMI Status</p>
                              {patientData.map((record,i)=>{
                              let recordLen = patientData.length;
                              let bmi = record.weight / Math.pow(record.height / 100, 2);

                              if (recordLen === i + 1) {
                             
                              return(
                                <>
                              {(bmi < 18.5) ? <h5 className="text-center text-danger">Underweight</h5>: (bmi>= 18.5 && bmi<=25) ?
                              <h5 className="text-center text-success">Normal</h5>:(bmi>=25 && bmi<=30)?<h5 className="text-center text-warning">Overweight</h5>:
                              <h5 className="text-center text-danger">Obese</h5>}
                              </>
                              )
                              
                            } else {
                              // not last one
                            }

                            })}
                         </div>
                          </div>
                        </div>
                      </div>
                        <div className="row">
                          <div className="col-md-6">
                          <BP id={props.match.params.id}/>
                          </div>
                          <div className="col-md-6">
                          <HR id={props.match.params.id}/>
                          </div>
                        </div>
                    
                    </div>
                  </div>
                </div>
</>
              }
            
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
