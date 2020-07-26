import React,{useContext, useEffect} from 'react'
import logo from '../assets/images/logo.png'
import pic from '../assets/images/pic.png'
import { DoctorContext } from "../context/DoctorContext";

const PatientStats = (props) => {

  const context = useContext(DoctorContext);
  const {fetchPatientData,fetchIndividualDoc,doctorInfo} = context;
  useEffect(()=>{
    async function initialize() {
        await fetchIndividualDoc()
        await fetchPatientData(sessionStorage.getItem("token"),props.match.params.id) 
      }
      initialize();

    
  },[])
  
    return (
        <div className="container-fluid bg-white">
        {/* TOP SECTION START */}
        <section className="top-section">
          <div className="logo">
            <div className="row">
              <div className="col-md-4">
                <img src={logo} alt="logo" />
              </div>
              <div className="col-md-8">
                <h5>Moyoweb</h5>
              </div>
            </div>
          </div>
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
                  <h6>Patient What</h6>
                </div>
                <div className="middle-part">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a className="nav-link active " id="v-pills-records-tab" data-toggle="pill" href="#v-pills-records" role="tab" aria-controls="v-pills-records" aria-selected="true">Records</a>
                    <a className="nav-link" id="v-pills-prescriptions-tab" data-toggle="pill" href="#v-pills-prescriptions" role="tab" aria-controls="v-pills-prescriptions" aria-selected="false">Prescriptions</a>
                    <a className="nav-link" id="v-pills-contact-tab" data-toggle="pill" href="#v-pills-contact" role="tab" aria-controls="v-pills-contact" aria-selected="false">Contact Info</a>
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
              <scetion className="main">
                <p className="mt-1">Patient What Dash</p>
                <div className="tab-content" id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-records" role="tabpanel" aria-labelledby="v-pills-records-tab">
                     <div className="row mt-4 pl-5 row-main">
                  <div className="col-md-3 mx-3 square">
                    <p>Systolic/Diastolic pressure</p>
                  </div>
                  <div className="col-md-3 mx-3 square">
                    <p>Heart rate</p>
                  </div>
                  <div className="col-md-3 mx-3 square">
                    <p>Weight</p>
                    <p>Height</p>
                    <p>BMI</p>
                  </div>
                </div>
                {/* GRAPH PART */}
                <div className="row mt-4">
                    <div className="col-md-5 graph">
                        <p>Graph 1</p>
                    </div>
                    <div className="col-md-5 offset-md-1 graph">
                        <p>Graph 2</p>
                    </div>
                </div>
        </div>
        <div className="tab-pane fade" id="v-pills-prescriptions" role="tabpanel" aria-labelledby="v-pills-prescriptions-tab">Prescription Info of Patient</div>
        <div className="tab-pane fade" id="v-pills-contact" role="tabpanel" aria-labelledby="v-pills-contact-tab">Contact Info of Patient</div>
      </div>
           
            
              </scetion>
              {/* FOOTER SECTION START */}
              <footer className="footer">
                <div>Email : naekuj@students.uonbi.ac.ke</div>
                <div>Tel : +245 718 592 124</div>
                <div>Copyright © 2020</div>
                <div className="social-icons">
                  <a href><i className="fab fa-twitter" /></a>
                  <a href><i className="fab fa-linkedin-in" /></a>
                  <a href><i className="fab fa-github" /></a>
                  <a href><i className="fab fa-instagram" /></a>
                </div>
              </footer>
            </div>
          </div>
        </section>
      </div>
    )
}

export default PatientStats
