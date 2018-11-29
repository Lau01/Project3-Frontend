import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'
import Login from './components/Login'
import SignUp from './components/SignUp';
import FavTrips from './components/FavTrips';
// import Map from './components/TripMap';
import './App.css';

const Routes = (
  <Router>
    <div>
      <Route path = "/" component = {NavBar} />
      <Route path = "/search" component = {SearchBar} />
      <Route exact path = "/search/:origin/:destination" component = {SearchResults}/>
      <Route exact path = "/login" component = {Login}/>
      <Route exact path = "/signup" component = {SignUp} />
      <Route exact path = "/search/favtrips" component = {FavTrips} />
      {/* <Route exact path = "/map" component = {TripMap} /> */}
    </div>
  </Router>
);

export default Routes
