import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import { Text, Button as GrommetButton, Grommet } from 'grommet';
import { Trash } from "grommet-icons";


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

  // handle when delete button is clicked, make an axios post to delete trip specified
  onDeleteFav() {
    // axios.post('http://localhost:3000/user/deltrips', {
    axios.post('https://plan-trip.herokuapp.com/user/deltrips', {
      origin: this.state.origin,
      destination: this.state.destination
    })
    // once axios req is made, run the handleDelete function in props which will get the updated list of fav trips
    .then(res => {
      this.props.handleDelete();
    })
    .catch(err => {
      console.log(err)
    })

  }

  // when clicking a fav trip, run the handleFavClick prop function which will make an axios req to fund the trip details
  handleFavClick (event) {
    this.props.handleFavClick(event, this.state.origin, this.state.destination);
  }

  render() {
    return(
      <div>
        <button
          onClick={this.handleFavClick}
          className="favTripButton"
        >
          <span>
            From: {this.props.trip.origin}
          </span>
          <span>
            To: {this.props.trip.destination}
          </span>
        </button>

        <GrommetButton
          plain="true"
          onClick={this.onDeleteFav}
          color="dark-3"
          icon={<Trash />}
          className="trashButton"
        />
      </div>
    )
  }
}

export default withRouter(DisplayFavs);
