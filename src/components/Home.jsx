import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchTrip from '../components/SearchTrip';

class Home extends Component {

  render() {
    return(
      <div>
        <h2>Trip Planner</h2>
        <Link to="/login"><button className="Login">Login</button></Link>
        <Link to="/signup"><button className="signUp">Sign Up</button></Link>
        <SearchTrip />
      </div>
    )
  }
}

export default Home;
