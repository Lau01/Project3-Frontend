import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchTrip from './components/SearchTrip';
import SearchResults from './components/SearchResults'
import Login from './components/Login'
import SignUp from './components/SignUp';
// import Map from './components/Map';
import './App.css';

const Routes = (
  <Router>
    <div>
      <Route path = "/search" component = {SearchTrip} />
      <Route exact path = "/search/:origin/:destination" component = {SearchResults}/>
      <Route exact path = "/login" component = {Login}/>
      <Route exact path = "/signup" component = {SignUp} />
      {/* <Route exact path = "/map" component = {TripMap} /> */}
    </div>
  </Router>
);

export default Routes
