import React, {Component} from 'react';
import axios from 'axios';
import DisplaySearch from '../components/DisplaySearch'
import AddTrip from '../components/AddTrip'
import TripMap from '../components/TripMap'


class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      bestOrigin: {},
      bestDestination: {},
      // originId: '',
      // destinationId: '',
      journeys: [],
      favTrips: [],
      journeyNumber: 0,
    }

    this.onClick = this.onClick.bind(this);
    this.handleJourneyClick = this.handleJourneyClick.bind(this);
  }

  componentDidUpdate(prevProps) {

    const {
      origin,
      destination
    } = this.props.match.params

    if (origin !== prevProps.match.params.origin || destination !== prevProps.match.params.destination) {

      /////GET ORIGIN
      function originRequest() {
        // return axios.get(`http://localhost:3000/stop/${origin}`)
        return axios.get(`https://plan-trip.herokuapp.com/stop/${origin}`)
      }
      ///////GET DESTINATION
      function destinationRequest() {
        // return axios.get(`http://localhost:3000/stop/${destination}`)
        return axios.get(`https://plan-trip.herokuapp.com/stop/${destination}`)
      }

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
            // originId: bestOriginLocation[0].id,
            // destinationId: bestDestinationLocation[0].id
          })

          const {
            bestOrigin,
            bestDestination
          } = this.state
          // return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
          return axios.get(`https://plan-trip.herokuapp.com/planner/${bestOrigin.id}/${bestDestination.id}`)
        }))
        .then((res) => {
          this.setState({
            journeys: res.data.journeys
          })

        })
        .catch(err => {
          console.warn(err);
        })
    } // if prevProps !== ...
  } //componentDidUpdate

  componentDidMount() {
    const {
      origin,
      destination
    } = this.props.match.params

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
        // originId: bestOriginLocation[0].id,
        // destinationId: bestDestinationLocation[0].id
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
        journeys: res.data.journeys
      })
    })
    .catch(err => {
      console.warn(err);
    })
  } // componentDidMount

  // onClick for add Fav Trip
  onClick(event) {
    const {
      origin,
      destination
    } = this.props.match.params

    //only add trip if JWT token present otherwise redirect to login
    if(window.localStorage.getItem('token')){
      // axios.post(`http://localhost:3000/user/favtrip/${origin}/${destination}`,
      axios.post(`https://plan-trip.herokuapp.com/user/favtrip/${origin}/${destination}`,
        {
          favTrip: {
            origin: origin,
            destination: destination
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
      this.props.history.push(`/login`);
    } // IF JWT token present
  } // onClick for add fav trip to user

  // clicking a journey displays routes on Trip Map
  handleJourneyClick = (journeyNumber, showTripDetails) => {
    console.log('hello from the bottom', showTripDetails)
    this.setState({
      journeyNumber: journeyNumber,
      showTripDetails: showTripDetails
    })
  }

  render () {
    const originShort = this.state.bestOrigin.disassembledName;
    const originFull = this.state.bestOrigin.name;
    const destShort = this.state.bestDestination.disassembledName;
    const destFull = this.state.bestDestination.name;

    const {
      journeys,
      bestOrigin,
      bestDestination
    } = this.state

    return (
      <div>
        {journeys.length > 0 ?
          <div className="container">
          <div className="displaySearchContainer">
          <div className="searchHeader">
            {originShort ? originShort : originFull} to {destShort ? destShort : destFull}
            <button className="plusTripButton" onClick={this.onClick}>+ Trip</button>
          </div>
          {journeys.map(journey =>
            <DisplaySearch
            handleJourneyClick={this.handleJourneyClick}
            journeyNumber={journeys.indexOf(journey)}
            journey={journey}
            />
          )}
        </div>
        <TripMap
          journeyNumber={this.state.journeyNumber}
          journeys={journeys}
          originCoords={bestOrigin.coord}
          destinationCoords={bestDestination.coord}
        />
      </div>
        :
        <div className="loading">Loading ...</div>
        }
        {/* <TripMap
          journeys={this.state.journeys}
        /> */}
      </div>
    )
  }
}

export default SearchResults;
