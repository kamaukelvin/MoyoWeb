import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Route, Switch} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test'
import './App.css'
import PatientsList from './pages/PatientsList';
import PatientStats from './pages/PatientStats';

function App() {
  return (
    <div className="App">
          <Switch>
            <Route exact path="/" component={Signup}/>
            <Route exact  path="/login" component={Login}/>
            <Route exact  path="/dashboard" component={Dashboard}/>
            <Route exact  path="/patients" component={PatientsList}/>
            <Route exact  path="/test" component={Test}/>
            <Route exact  path="/patient/:id" component={PatientStats}/>
            <Route component={Error}/>
            
          </Switch>
    </div>
  );
}

export default App;
