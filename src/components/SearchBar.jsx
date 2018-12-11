import React, {Component} from 'react';
import SearchResults from '../components/SearchResults'
import axios from 'axios';
import { FormField, TextInput, Button } from 'grommet';
import TripMap from '../components/TripMap';
import FavTrips from './FavTrips';
import {pickerFunction} from '../lib/util';
import { PropagateLoader } from 'react-spinners';


class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      destination: '',
      journeys: [],
      journeySelected: 0,
      bestOrigin: {},
      bestDestination: {},
      loading: false,
      displayFavs: false,
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleJourneyClick = this.handleJourneyClick.bind(this);
    this.onClickFavsButton = this.onClickFavsButton.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
  }

  // Origin and Destination Search state change
  // handleChange(event) {
  //   this.setState({[event.target.name]: event.target.value})
  // }

  // Search button
  handleSubmit(event, origin=this.origin.value, destination=this.destination.value) {

    this.setState({
      displayFavs: false,
    })

      //GET ORIGIN function
    function originRequest() {
      // return axios.get(`http://localhost:3000/stop/${origin}`)
      return axios.get(`https://plan-trip.herokuapp.com/stop/${origin}`)

    }
    //GET DESTINATION function
    function destinationRequest() {
      // return axios.get(`http://localhost:3000/stop/${destination}`)
      return axios.get(`https://plan-trip.herokuapp.com/stop/${destination}`)
    }
    // setState loading:true with callback as axios request
    this.setState( {loading: true}, () => {
      // make both requests for origin and destination to stop finder API
      axios.all([originRequest(), destinationRequest()])
      .then(axios.spread((originRes, destinationRes) => {
        // do something with both responses
        let locationsOriginArray = originRes.data.locations
        let locationsDestinationArray = destinationRes.data.locations

        // each location is an object
        // filter best search result for both origin and destination
        let bestOriginLocation = locationsOriginArray.filter(location => {
          return location["isBest"] === true;
        })

        let bestDestinationLocation = locationsDestinationArray.filter(location => {
          return location["isBest"] === true;
        })

        this.setState({
          bestOrigin: bestOriginLocation[0],
          bestDestination: bestDestinationLocation[0],
        })

      // ES6 destructuring
        const {
          bestOrigin,
          bestDestination
        } = this.state
      // GET request for trip planner
      // return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
        return axios.get(`https://plan-trip.herokuapp.com/planner/${bestOrigin.id}/${bestDestination.id}`)
      }))
      .then((res) => {
        this.setState({
          error: false,
          loading: false,
          journeys: res.data.journeys
        })
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          error: 'Oops. Something went wrong. Please search again.'
        });
      }); // end of axios promises
    }); // setState

    // this.props.history.push(`/search/${origin}/${destination}`)
    event.preventDefault();
  } //handleSubmit

  handleJourneyClick(journeyNumber) {
    console.log('journeyNumber', journeyNumber)
    this.setState({
      journeySelected: journeyNumber
    })
  }

  // End of callbacks to handle a fav trip click.
  // When a fav trip is clicked, submit a new request with clicked origin and destination received from <DisplayFavs />
  handleFavClick(event, origin, destination) {
    this.handleSubmit(event, origin, destination)
  }

  // Display logic when show fav trip button is clicked
  onClickFavsButton() {
    this.setState({
      displayFavs: !this.state.displayFavs
    })
  }

  render() {

    const {
      journeys,
      journeySelected,
      bestOrigin,
      bestDestination,
      loading,
      displayFavs,
      error
    } = this.state

    // Display logic for fav button
    let favsText = pickerFunction(displayFavs, "Back", "Show Favs");

    // Display SearchResults only when journeys.length !== 0
    let searchResults = pickerFunction(
      journeys.length,
      <SearchResults
        handleJourneyClick={this.handleJourneyClick}
        journeys={journeys}
        bestOrigin={bestOrigin}
        bestDestination={bestDestination}
      />,
      null
    )

    let errorMessage = pickerFunction(
      error,
      <div className="stopsError">{this.state.error}</div>,
      <div className="loading">
        <PropagateLoader color={'#7D4CDB'}/>
      </div>
    )

    // Loading Animation during axios req, otherwise searchResults variable (which is SearchResults component when journeys.length !== 0). Using react-spinners
    let searchResultDiv = pickerFunction(
      loading,
      errorMessage,
      searchResults
    );

    // The favorite button only shows if a user is logged in
    let favButton = pickerFunction(
      localStorage.getItem('token'),
      <Button
        className="searchButton"
        onClick={this.onClickFavsButton}
        label={favsText}
        margin={{"left":"10px"}}
      />,
      null
    )

    return(
      <div className="searchBarContainer">
        <form onSubmit={this.handleSubmit}>
          <div className="toFromContainer">
            <FormField label="From:">
              <TextInput
                name="origin"
                ref={el => this.origin = el}
              />
            </FormField>

            <FormField label="To:">
              <TextInput
                name="origin"
                ref={el => this.destination = el}
              />
            </FormField>
            <Button
              className="searchButton"
              label="Go"
              type="submit"
              margin={{"left":"10px"}}
            />
            {favButton}
          </div>
        </form>
        {this.state.displayFavs ?
        <FavTrips handleFavClick={this.handleFavClick}/>
        :
        searchResultDiv
        }

        <TripMap
          journeySelected={journeySelected}
          journeys={journeys}
        />
      </div>
    )
  }
}

export default SearchBar;
