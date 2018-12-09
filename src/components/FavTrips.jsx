import React, {Component} from 'react';
import DisplayFavs from '../components/DisplayFavs'
import axios from 'axios';
import {pickerFunction} from '../lib/util'

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
    this.setState( {loading: true}, () => {
      axios.get(`https://plan-trip.herokuapp.com/user/favtrips`)
      .then(res => {
        console.log(res.data)
        this.setState({
          loading: false,
          favTrips: res.data
        })
        console.log(this.state.favTrips)
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
      <ul>
        {this.state.loading ?
        <div>Loading Favs...</div>
        :
        this.state.favTrips.map(trip =>
        <li className='favTripItem'>
          <DisplayFavs
            handleFavClick={this.handleFavClick}
            handleDelete={this.handleDelete}
            trip={trip}
          />
        </li>
        )
        }
      </ul>
    )
  }
}

export default FavTrips;
