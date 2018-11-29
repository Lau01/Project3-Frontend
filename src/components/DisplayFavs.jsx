import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class DisplayFavs extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: ''
    }

    this.onDeleteFavClick = this.onDeleteFavClick.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);



  }

  componentDidMount() {
    this.setState({
      origin: this.props.trip.origin,
      destination: this.props.trip.destination
    })
    // axios.get(`http://localhost:3000/user/favtrips`)
    // .then(res => {
    //   this.setState({
    //     favTrips: res.data
    //   })
    // })
    // .catch(err => {
    //   console.warn(err);
    // });
  }

  onDeleteFavClick() {
    // axios.post('http://localhost:3000/user/deltrips', {
    axios.post('https://plan-trip.herokuapp.com/user/deltrips', {
      origin: this.state.origin,
      destination: this.state.destination
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // clickDelUpdate = () => {
  //   this.props.handleUpdate();
  // }

  handleFavClick = () => {
    const {
      origin,
      destination
    } = this.state
    console.log(this)
    this.props.history.push(`/search/${origin}/${destination}`);
  }

  render() {
    return(
      <div>
        <button
          onClick={this.handleFavClick}
          className="favTripButton"
        >
          {this.props.trip.origin} to {this.props.trip.destination}
        </button>

        <button onClick={this.onDeleteFavClick}>Delete Trip</button>
      </div>
    )
  }
}

export default withRouter(DisplayFavs);
