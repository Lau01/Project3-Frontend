import React, {Component} from 'react';
import axios from 'axios';
import DisplaySearch from '../components/DisplaySearch'


class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      bestOrigin: {},
      bestDestination: {},
      originCoord: [],
      destinationCoord: [],
      journeys: []
    }
  }

  componentDidUpdate(prevProps) {
    const {
      origin,
      destination
    } = this.props.match.params

    if (origin !== prevProps.match.params.origin || destination !== prevProps.match.params.destination) {

      /////GET ORIGIN
      function originRequest() {
        return axios.get(`http://localhost:3000/stop/${origin}`)
      }
      ///////GET DESTINATION
      function destinationRequest() {
        return axios.get(`http://localhost:3000/stop/${destination}`)
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
            originCoord: bestOriginLocation[0]["coord"],
            destinationCoord: bestDestinationLocation[0]["coord"]
          })

          // ES6 destructuring
          const {
            originCoord,
            destinationCoord
          } = this.state

          return axios.get(`http://localhost:3000/searchtrip/${originCoord[0]}/${originCoord[1]}/${destinationCoord[0]}/${destinationCoord[1]}`)
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
  }

  componentDidMount() {
    const {
      origin,
      destination
    } = this.props.match.params

    /////GET ORIGIN function
    function originRequest() {
      return axios.get(`http://localhost:3000/stop/${origin}`)
      // .then(res => {
      //   let locationsArray = res.data.locations
      //   // each location is an object
      //   let bestLocation = locationsArray.filter(location => {
      //     return location["isBest"] === true
      //   })
      //   this.setState({
      //     bestOrigin: bestLocation[0],
      //     originCoord: bestLocation[0]["coord"]
      //   })
      // })
      // .catch( err => {
      //   console.warn(err)
      // })
    }
    ///////GET DESTINATION function
    function destinationRequest() {
      return axios.get(`http://localhost:3000/stop/${destination}`)
      // .then(res => {
      //   let locationsArray = res.data.locations
      //   // each location is an object
      //   let bestLocation = locationsArray.filter(location => {
      //     return location["isBest"] === true
      //   })
      //
      //   this.setState({
      //     bestDestination: bestLocation[0],
      //     destinationCoord: bestLocation[0]["coord"]
      //   })
      // })
      // .catch( err => {
      //   console.warn(err);
      // })
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
          originCoord: bestOriginLocation[0]["coord"],
          destinationCoord: bestDestinationLocation[0]["coord"]
        })

        // ES6 destructuring
        const {
          originCoord,
          destinationCoord
        } = this.state

        // GET request for trip planner
        return axios.get(`http://localhost:3000/searchtrip/${originCoord[0]}/${originCoord[1]}/${destinationCoord[0]}/${destinationCoord[1]}`)
      }))
      .then((res) => {
        console.log(res.data.journeys)
        this.setState({
          journeys: res.data.journeys
        })

      })
      .catch(err => {
        console.warn(err);
      })
  } // componentDidMount

  render() {
    const {
      bestOrigin,
      bestDestination,
      originCoord,
      destinationCoord
    } = this.state

    return(
      <div>
        <h2>{this.props.match.params.origin},
        name from Req: {bestOrigin.disassembledName},
        coord from Req: {originCoord[0]}, {originCoord[1]}
        </h2>
        to:
      <h2>
        {this.props.match.params.destination},
        name from Req: {bestDestination.disassembledName},
        coord from Req: {destinationCoord[0]}, {destinationCoord[1]}
      </h2>
      <DisplaySearch
        journeys={this.state.journeys}
      />
      </div>
    )
  }
}

export default SearchResults;
