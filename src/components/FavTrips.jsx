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

  }

  componentDidMount() {
    axios.get(`http://localhost:3000/user/favtrips`)
    .then(res => {
      this.setState({
        favTrips: res.data
      })
      console.log(this.state.favTrips)
    })
    .catch(err => {
      console.warn(err);
    });
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
