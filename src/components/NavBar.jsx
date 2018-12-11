import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import FavTrips from './FavTrips';
import axios from 'axios';
import train from '../components/train.svg'

class NavBar extends Component {

  constructor() {
    super();

    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    // check if there is entry in localStorage.
    if ( 'localStorage' in window ){
      // set all axios requests to have an Authorization header of Bearer <token>
      axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
    }
  }

  handleLogOut() {
    if ( 'localStorage' in window ) {
      // on logout, delete the JWT token stored in local storage
      window.localStorage.removeItem('token');
      window.location.reload();
    } else {
      this.props.history.push(`/login`);
    }
  }

  render() {
    return(
      <div className="navContainer">
        <div className="nav searchNav">
          <Link to="/search"><img className="trainImage" src={train}></img> Search Trip</Link>
        </div>
        <div className="navBar">
          {window.localStorage.getItem('token') ?
          <span className="nav userNav">
            <button
              onClick={this.handleLogOut}
              className="logOutButton"
            >
              Log Out
            </button>
          </span>
          :
          <span>
            <span className="nav userNav">
              <Link to="/signup">Sign Up</Link>
            </span>
            <span className="nav userNav">
              <Link to="/login">Login</Link>
            </span>
          </span>
          }
        </div>
      </div>
    )
  }
}

export default NavBar;
