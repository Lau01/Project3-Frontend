import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar';
import Login from './components/Login'
import SignUp from './components/SignUp';
// import TripMap from './components/TripMap';
import './App.css';

const Routes = (
  <Router>
    <div>
      <Route path = "/" component = {NavBar} />
      <Route path = "/search" component = {SearchBar} />
      <Route exact path = "/login" component = {Login}/>
      <Route exact path = "/signup" component = {SignUp} />
    </div>
  </Router>
);

export default Routes
