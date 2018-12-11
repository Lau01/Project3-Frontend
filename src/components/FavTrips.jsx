import React, {Component} from 'react';
import DisplayFavs from '../components/DisplayFavs'
import axios from 'axios';
import { Text } from 'grommet';
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

  // Get the logged in user's favorite trips by making an axios request to back end and identifying with their auth token.
  getRequest() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`
    this.setState( {loading: true}, () => {
      axios.get(`https://plan-trip.herokuapp.com/user/favtrips`)
      .then(res => {
        // Setting state to the returned data of the users fav Trips
        // Also have to set state of loading for display logic of loading animation
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

  // When component mounts, run the getRequest function
  componentDidMount() {
    this.getRequest();
  }

  // Get new list of fav trips for user when a trip is deleted
  handleDelete = () => {
    this.getRequest()
  }

  // Callback to send origin/destination up to parent.
  // Will run the SearchBar props handleFavClick in the parent component (<SearchBar />).
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
          <div className="favTripHeader">
            <Text size="large">Your Favorite Trips</Text>
          </div>
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
