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

    this.onDeleteFav = this.onDeleteFav.bind(this);
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

  onDeleteFav() {
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

    this.props.handleDelete()
  }

  // clickDelUpdate = () => {
  //   this.props.handleUpdate();
  // }

  handleFavClick (event) {
    this.props.handleFavClick(event, this.state.origin, this.state.destination);
    // const {
    //   origin,
    //   destination
    // } = this.state
    //
    // this.props.history.replace(`/search`);
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

        <button onClick={this.onDeleteFav}>Delete Trip</button>
      </div>
    )
  }
}

export default withRouter(DisplayFavs);
