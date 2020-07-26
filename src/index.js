import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import {AuthContextProvider} from './context/AuthContext'
import {DoctorContextProvider} from './context/DoctorContext'

ReactDOM.render(
  <React.StrictMode>
     <Router>
    <AuthContextProvider>
    <DoctorContextProvider>
    <App />
    </DoctorContextProvider>
    </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
