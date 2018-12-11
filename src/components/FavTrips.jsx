import React, {Component} from 'react';
import DisplayFavs from '../components/DisplayFavs'
import axios from 'axios';
import {pickerFunction} from '../lib/util';
import { Text, Button as GrommetButton, Grommet } from 'grommet';
import { css } from 'react-emotion';
import { PropagateLoader } from 'react-spinners';

class FavTrips extends Component {
  constructor() {
    super();
    this.state = {
      favTrips: [],
      loading: false,
      afterLoad: false,
      error: null,
    }

    this.handleFavClick = this.handleFavClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getRequest = this.getRequest.bind(this);
  }

  getRequest() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
    this.setState( {loading: true}, () => {
      axios.get(`https://plan-trip.herokuapp.com/user/favtrips`)
      .then(res => {
        this.setState({
          loading: false,
          favTrips: res.data
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          error: "Please login to view your fav trips"
        })
      });
    })
  } //getRequest

  componentDidMount() {
    this.getRequest();
    // setInterval(() => this.getRequest(), 1000)
  }

  // Get new list of fav trips for user when a trip is deleted
  handleDelete = () => {
    this.getRequest()
  }

  // Callback to handle when fav trip is clicked
  handleFavClick = (event, origin, destination) => {
    this.props.handleFavClick(event, origin, destination)
  }

  render() {

    return(
      <div>
        {this.state.loading ?

        <div className="loading"><PropagateLoader color={'#7D4CDB'}/></div>
        :
        <div className="favTripContainer">
          <Text>Your Favorite Trips</Text>
          <ul className="favList">
          {this.state.favTrips.map(trip =>
            <li className='favTripItem'>
              <DisplayFavs
                handleFavClick={this.handleFavClick}
                handleDelete={this.handleDelete}
                trip={trip}
              />
            </li>
          )}
          </ul>
        </div>
      }
      </div>
    )
  }
}

export default FavTrips;
