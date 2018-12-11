import React, {Component} from 'react';
import axios from 'axios';
import DisplaySearch from '../components/DisplaySearch';
import AddTrip from '../components/AddTrip';
import TripMap from '../components/TripMap';
import { Text, Button as GrommetButton, Grommet } from 'grommet';
import { Add } from "grommet-icons";
import {pickerFunction} from '../lib/util';
// import addButtonTheme from '../custom-grommet-themes/themes';

const addButtonTheme = {
  color: "dark-3",
  button: {
    border: {
      color: "dark-3"
    }
  }
}



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

  // componentDidUpdate(prevProps) {
  //
  //   // const {
  //   //   origin,
  //   //   destination
  //   // } = this.props.match.params
  //
  //   const {
  //     origin,
  //     destination
  //   } = this.props
  //
  //   if (this.props.origin !== prevProps.origin || this.props.destination !== prevProps.destination) {
  //
  //     /////GET ORIGIN
  //     function originRequest() {
  //       // return axios.get(`http://localhost:3000/stop/${origin}`)
  //       return axios.get(`https://plan-trip.herokuapp.com/stop/${origin}`)
  //     }
  //     ///////GET DESTINATION
  //     function destinationRequest() {
  //       // return axios.get(`http://localhost:3000/stop/${destination}`)
  //       return axios.get(`https://plan-trip.herokuapp.com/stop/${destination}`)
  //     }
  //
  //     // setState loading:true with callback as axios request
  //     this.setState( {loading: true}, () => {
  //       // make both requests for origin and destination to stop finder API
  //       axios.all([originRequest(), destinationRequest()])
  //       .then(axios.spread((originRes, destinationRes) => {
  //         // do something with both responses
  //         let locationsOriginArray = originRes.data.locations
  //         let locationsDestinationArray = destinationRes.data.locations
  //
  //         // each location is an object
  //         // filter best search result for both origin and destination
  //         let bestOriginLocation = locationsOriginArray.filter(location => {
  //           return location["isBest"] === true;
  //         })
  //
  //         let bestDestinationLocation = locationsDestinationArray.filter(location => {
  //           return location["isBest"] === true;
  //         })
  //
  //         this.setState({
  //           bestOrigin: bestOriginLocation[0],
  //           bestDestination: bestDestinationLocation[0],
  //         })
  //
  //         const {
  //           bestOrigin,
  //           bestDestination
  //         } = this.state
  //         // return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
  //         return axios.get(`https://plan-trip.herokuapp.com/planner/${bestOrigin.id}/${bestDestination.id}`)
  //       }))
  //       .then((res) => {
  //         this.setState({
  //           loading: false,
  //           journeys: res.data.journeys
  //         })
  //
  //       })
  //       .catch(err => {
  //         console.warn(err);
  //       }) // end of axios promises
  //     })
  //   } // if prevProps !== ...
  // } //componentDidUpdate

  // componentDidMount() {
  //   // const {
  //   //   origin,
  //   //   destination
  //   // } = this.props.match.params
  //
  //   const {
  //     origin,
  //     destination
  //   } = this.props
  //
  //   //GET ORIGIN function
  //   function originRequest() {
  //     // return axios.get(`http://localhost:3000/stop/${origin}`)
  //     return axios.get(`https://plan-trip.herokuapp.com/stop/${origin}`)
  //
  //   }
  //   //GET DESTINATION function
  //   function destinationRequest() {
  //     // return axios.get(`http://localhost:3000/stop/${destination}`)
  //     return axios.get(`https://plan-trip.herokuapp.com/stop/${destination}`)
  //   }
  //   // setState loading:true with callback as axios request
  //   this.setState( {loading: true}, () => {
  //     // make both requests for origin and destination to stop finder API
  //     axios.all([originRequest(), destinationRequest()])
  //     .then(axios.spread((originRes, destinationRes) => {
  //       // do something with both responses
  //       let locationsOriginArray = originRes.data.locations
  //       let locationsDestinationArray = destinationRes.data.locations
  //
  //       // each location is an object
  //       // filter best search result for both origin and destination
  //       let bestOriginLocation = locationsOriginArray.filter(location => {
  //         return location["isBest"] === true;
  //       })
  //
  //       let bestDestinationLocation = locationsDestinationArray.filter(location => {
  //         return location["isBest"] === true;
  //       })
  //
  //       this.setState({
  //         bestOrigin: bestOriginLocation[0],
  //         bestDestination: bestDestinationLocation[0],
  //       })
  //
  //     // ES6 destructuring
  //       const {
  //         bestOrigin,
  //         bestDestination
  //       } = this.state
  //     // GET request for trip planner
  //     // return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
  //       return axios.get(`https://plan-trip.herokuapp.com/planner/${bestOrigin.id}/${bestDestination.id}`)
  //     }))
  //     .then((res) => {
  //       this.setState({
  //         loading: false,
  //         journeys: res.data.journeys
  //       })
  //       console.log(this.state.journeys)
  //     })
  //     .catch(err => {
  //       console.warn(err);
  //     }) // end of axios promises
  //   }) // setState
  // } // componentDidMount

  // onClick for add Fav Trip
  onAddTripClick(event) {
    const {
      bestOrigin,
      bestDestination
    } = this.props

    //only add trip if JWT token present otherwise redirect to login
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
      console.log('clicked add button');
      event.preventDefault();
    } else {
      this.props.history.push('/login');
    } // IF JWT token present
  } // onClick for add fav trip to user

  // clicking display journey details shows routes on Trip Map
  handleJourneyClick = (journeyNumber, showTripDetails) => {
    // this.setState({
    //   journeyNumber: journeyNumber,
    //   showTripDetails: showTripDetails
    // })
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

    // helper function to determine which name to use
    let originName = pickerFunction(originShort, originShort, originFull);
    let destinationName = pickerFunction(destShort, destShort, destFull)


    // if logged in, add trip button is displayed, null if not
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
