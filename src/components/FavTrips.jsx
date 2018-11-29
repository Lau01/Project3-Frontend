import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';

function DisplayFavs() {
  return(
    <div>
      asdasdas
    </div>
  )
}

class FavTrips extends Component {
  constructor() {
    super();
    this.state = {
      favTrips: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/user/favtrips`, {
        email: "test5@test.com"
    })
    .then(res => {
      console.log(res)
      // this.setState({
      //   favTrips: res.data
      // })
      // console.log(this.state.favTrips)
    })
    .catch(err => {
      console.warn(err);
    });
  }


  render() {
    return(
      <div>
        Your Fav Trips
      </div>
    )
  }
}

export default FavTrips;
