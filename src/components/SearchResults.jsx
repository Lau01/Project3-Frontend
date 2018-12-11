import React, {Component} from 'react';
import axios from 'axios';
import DisplaySearch from '../components/DisplaySearch';
import AddTrip from '../components/AddTrip';
import TripMap from '../components/TripMap';
import { Text, Button as GrommetButton, Grommet } from 'grommet';
import { Add } from "grommet-icons";
import {pickerFunction} from '../lib/util';
// import addButtonTheme from '../custom-grommet-themes/themes';




class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      bestOrigin: {},
      bestDestination: {},
      journeys: [],
      favTrips: [],
      journeyNumber: 0,
      loading: false
    }

    this.onAddTripClick = this.onAddTripClick.bind(this);
    this.handleJourneyClick = this.handleJourneyClick.bind(this);
  }

  // onClick for add Fav Trip. On click will make an axios post to fav Trips to add the specified trip.
  onAddTripClick(event) {
    const {
      bestOrigin,
      bestDestination
    } = this.props

    // Only add trip if JWT token present otherwise redirect to login
    if(window.localStorage.getItem('token')){
      // axios.post(`http://localhost:3000/user/favtrip/${origin}/${destination}`,
      axios.post(`https://plan-trip.herokuapp.com/user/favtrip/${bestOrigin.name}/${bestDestination.name}`,
        {
          favTrip: {
            origin: bestOrigin.name,
            destination: bestDestination.name
          }
        }
      )
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.warn(err)
      })
      event.preventDefault();
    } else {
      this.props.history.push('/login');
    } // IF JWT token present
  } // onClick for add fav trip to user

  // Clicking display journey details shows routes on Trip Map
  handleJourneyClick = (journeyNumber, showTripDetails) => {
    this.props.handleJourneyClick(journeyNumber, showTripDetails)
  }


  render () {
    const originShort = this.props.bestOrigin.disassembledName;
    const originFull = this.props.bestOrigin.name;
    const destShort = this.props.bestDestination.disassembledName;
    const destFull = this.props.bestDestination.name;

    const {
      journeys,
      bestOrigin,
      bestDestination,
      loading
    } = this.props

    // Helper function to use short name if available
    let originName = pickerFunction(originShort, originShort, originFull);
    let destinationName = pickerFunction(destShort, destShort, destFull)


    // If logged in, add trip button is displayed, null if not logged in
    let loggedInAddButton = pickerFunction(
      window.localStorage.getItem('token'),
      <GrommetButton
      color="dark-3"
      icon={<Add />}
      label="Trip"
      onClick={this.onAddTripClick}
      margin={{"left":"10px"}}
      >
      </GrommetButton>,
      null
    )

    return (
      <div>
        {loading ?
          <div className="loading">Loading ...</div>
          :
          <div className="searchContainer">
            <div className="displayTripsContainer">
              <div className="searchHeader">
                <Text size="large">
                  {originName} to {destinationName}
                </Text>
                  {loggedInAddButton}
              </div>

              {journeys.map(journey =>
                <DisplaySearch
                handleJourneyClick={this.handleJourneyClick}
                journeyNumber={journeys.indexOf(journey)}
                journey={journey}
                />
              )}
            </div>
          </div>
        }
      </div>
    )
  }
};

export default SearchResults;
