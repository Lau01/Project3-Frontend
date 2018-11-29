import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import FavTrips from './FavTrips'
// import axios from 'axios';

class NavBar extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.localStorage.removeItem('token');
    this.props.history.push(`/search`);
  }

  render() {
    return(
      <div className="navContainer">
        <div className="nav searchNav"><Link to="/search">🚉 Search Trip</Link></div>
        <div className="navBar">
          <span className="nav userNav"><Link to="/search/favtrips">Fav Trips</Link></span>
          <span className="nav userNav"><Link to="/login">Login</Link></span>
          <span className="nav userNav"><Link to="/signup">Sign Up</Link></span>
          {window.localStorage.getItem('token') &&
          <span className="nav userNav"><button onClick={this.handleClick} className="logOutButton">Log Out</button></span>
          }
        </div>
      </div>
    )
  }
}

export default NavBar;
