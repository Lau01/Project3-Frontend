import React, {Component} from 'react';
import axios from 'axios';
import DisplaySearch from '../components/DisplaySearch'
import AddTrip from '../components/AddTrip'


class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      bestOrigin: {},
      bestDestination: {},
      originId: '',
      destinationId: '',
      journeys: [],
      favTrips: []
      // routes: [],
      // startAddress: '',
      // endAddress: ''
    }

    this.onClick = this.onClick.bind(this);
  }


  onClick(event) {
    if(window.localStorage.getItem('token')){
      axios.post(`http://localhost:3000/user/favtrip/${originId}/${destinationId}`,
        {
          email: "test5@test.com",
          favTrip: {
            origin: originId,
            destination: destinationId
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
    } // IF token


    const {
      originId,
      destinationId
    } = this.state

  }

  componentDidUpdate(prevProps) {
    //   const {
    //     originId,
    //     destinationId
    //   } = this.props.match.params
    //
    // if (origin !== prevProps.match.params.originId || destination !== prevProps.match.params.destinationId) {
    //   const {
    //     origin,
    //     destination
    //   } = this.props.match.params
    //
    //   axios.get(`http://localhost:3000/searchtrip/${origin}/${destination}`)
    //   .then( res => {
    //     console.log(res.data.routes)
    //     this.setState({
    //       routes: res.data.routes,
    //       startAddress: res.data.routes[0].legs[0].start_address,
    //       endAddress: res.data.routes[0].legs[0].end_address
    //     })
    //
    //
    //   })
    //   .catch(err => {console.warn(err)})
    //
    // }
    // const {
    //   origin,
    //   destination
    // } = this.props.match.params
    //
    // axios.get(`http://localhost:3000/searchtrip/${origin}/${destination}`)
    // .then( res => {
    //   console.log(res.data.routes)
    //   this.setState({
    //     routes: res.data.routes
    //   })
    // })

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
            originId: bestOriginLocation[0].id,
            destinationId: bestDestinationLocation[0].id
          })

          const {
            originId,
            destinationId
          } = this.state

          return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
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

    /////GET ORIGIN function
    function originRequest() {
      return axios.get(`http://localhost:3000/stop/${origin}`)

    }
    ///////GET DESTINATION function
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
          originId: bestOriginLocation[0].id,
          destinationId: bestDestinationLocation[0].id
        })

        // ES6 destructuring
        const {
          originId,
          destinationId
        } = this.state
        // GET request for trip planner
        return axios.get(`http://localhost:3000/planner/${originId}/${destinationId}`)
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

    render () {
      const originShort = this.state.bestOrigin.disassembledName;
      const originFull = this.state.bestOrigin.name;
      const destShort = this.state.bestDestination.disassembledName;
      const destFull = this.state.bestDestination.name

      return (
        <div>
          <br/>
          <div>
            {originShort ? originShort : originFull} to {destShort ? destShort : destFull}
            <button onClick={this.onClick}>Add +</button>
          </div>
          {this.state.journeys.map(journey =>
            <DisplaySearch
            journey={journey}
            />
          )}
        </div>
      )
    }
  }

// /////// RENDER FOR GOOGLE VERSION
//   render() {
//     const {
//       routes,
//       startAddress,
//       endAddress
//     } = this.state
//
//     return(
//       <div>
//         <div>{startAddress} to {endAddress}</div>
//       <DisplaySearch
//         routes={routes}
//       />
//       </div>
//     )
//   }
// }
// //// GOOOGLE VERSION END

export default SearchResults;
