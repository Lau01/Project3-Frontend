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
    if( 'localStorage' in window ){
      axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
    }
  }

  handleLogOut() {
    window.localStorage.removeItem('token');
    this.props.history.push(`/search`);
  }

  render() {
    return(
      <div>
        <div className="navContainer">
          <div className="nav searchNav">
            <Link to="/search"><img className="trainImage" src={train}></img> Search Trip</Link>
          </div>
          <div className="navBar">
            <span className="nav userNav">
              <Link to="/search/favtrips">Fav Trips</Link>
            </span>
            {window.localStorage.getItem('token') ?
            <span className="nav userNav">
              <button
                onClick={this.handleLogOut}
                className="logOutButton"
              >
                Log Out
              </button>
            </span> :
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
      </div>
    )
  }
}

export default NavBar;
