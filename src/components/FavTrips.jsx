import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import DisplayFavs from '../components/DisplayFavs'
import axios from 'axios';

class FavTrips extends Component {
  constructor() {
    super();
    this.state = {
      favTrips: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.getRequest = this.getRequest.bind(this);
  }

  getRequest() {
    axios.get(`https://plan-trip.herokuapp.com/user/favtrips`)
    .then(res => {
      console.log(res.data)
      this.setState({
        favTrips: res.data
      })
      console.log(this.state.favTrips)
    })
    .catch(err => {
      console.warn(err);
    });
  }

  componentDidMount() {
    // axios.get(`http://localhost:3000/user/favtrips`)

    axios.get(`https://plan-trip.herokuapp.com/user/favtrips`)
    .then(res => {
      this.setState({
        favTrips: res.data
      })
      console.log(this.state.favTrips)
    })
    .catch(err => {
      console.warn(err);
    });

    setInterval(() => this.getRequest(), 500)
  }

  handleClick = () => {
    console.log('clicked')
    // axios.get(`http://localhost:3000/user/favtrips`)
    // .then(res => {
    //   this.setState({
    //     favTrips: res.data
    //   })
    //   console.log('clicked', this.state.favTrips)
    // })
    // .catch(err => {
    //   console.warn(err);
    // });
  }

  render() {
    return(
      <ul>
        {this.state.favTrips.map(trip =>
        <li className='favTripItem'>
          <DisplayFavs
            onClick={this.handleClick}
            trip={trip}
          />
        </li>
        )}
      </ul>
    )
  }
}

export default FavTrips;
