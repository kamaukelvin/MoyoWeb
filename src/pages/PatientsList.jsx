import React,{useContext,useEffect} from 'react'
import pic from '../assets/images/pic.png'
import logo from '../assets/images/logo.png'
import {Link} from 'react-router-dom'
import { DoctorContext } from "../context/DoctorContext";

const PatientsList = () => {

  const context = useContext(DoctorContext);
  const {fetchIndividualDoc,doctorInfo} = context;

  useEffect(()=>{
    async function initialize() {
        await fetchIndividualDoc()
      }
      initialize();

    
  },[])
    return (
      <div>
      <div className="grid-container bg-white">
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
        <div className="row">
          <div className="col-sm-3 side-prof">
            <div className="profile-side">
              <ul>
                <br />
                <br />
                <li><Link>Patients List</Link></li>
                <li><Link to="/dashboard">Patients Request</Link></li>
                <br />
                <br />
              </ul>
            </div>
            <div className="settings">
              <ul>
                <br />
                <br />
                <li>Settings</li>
                <li>Privacy Policy</li>
                <li>T &amp; C</li>
                <br />
                <br />
              </ul>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="profile ml-4">
              <p>Patient List</p>
              <div className="chip-1">
                <img src={pic} alt="Person" width={96} height={96} />
                <h5>Dr {doctorInfo.name}</h5> 
                <p>Md Cardeologist M.E.H</p>
              </div>
              <div className="container">
              <table className="table table-hover">
                <thead>
                  {/* <tr> */}
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  
                      <tr>
                        <td>name</td>
                        <td>email</td>

                        <td>
                          <button type="button" className="btn btn-light">
                            <i> Records</i>
                          </button>
                        </td>
                      </tr>
                   
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer mt-0 bg-white text-dark">
        <div>Email : naekuj@students.uonbi.ac.ke</div>
        <div>Tel : +245 718 592 124</div>
        <div>Copyright 2020</div>
        <div className="social-icons">
          <a href><i className="fab fa-twitter" /></a> 
          <a href><i className="fab fa-linkedin-in" /></a>  
          <a href><i className="fab fa-github" /></a> 
          <a href><i className="fab fa-instagram" /></a> 
        </div>
      </footer>
    </div>
    
       
    )
}

export default PatientsList
