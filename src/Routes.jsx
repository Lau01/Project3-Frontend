import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import SearchTrip from './components/SearchTrip';
import SearchResults from './components/SearchResults'
import Login from './components/Login'
import SignUp from './components/SignUp';



const Routes = (
  <Router>
    <div>
      <Route exact = "/" component = {SearchTrip} />
      <Route exact path = "/search/:origin/:destination" component = {SearchResults}/>
      <Route exact path = "/login" component = {Login}/>
      <Route exact path = "/signup" component = {SignUp} />
    </div>
  </Router>
);

export default Routes
