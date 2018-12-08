import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import DisplayLegs from '../components/DisplayLegs'
import '../App.css';
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

function TotalDuration(props) {
  let totalDuration = 0;
    props.legs.map(leg =>
    totalDuration += parseInt(leg.duration)/60
  )

  if (totalDuration > 59) {
    return moment.duration(totalDuration, "minutes").format("h [hrs], m [min]");
  } else {
    return `${totalDuration} mins`;
  }
}

class DisplaySearch extends Component {
  constructor() {
    super();
    this.state = {
      showTripDetails: false,
      legs: [],
      journeyNumber: null,
    }

    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);

  }

  componentDidMount() {
    this.setState({
      legs: this.props.journey.legs,
    })
  }

  handleCloseClick() {
    this.setState({
      showTripDetails: !this.state.showTripDetails
    })
  }
  handleOpenClick() {
    const {
      showTripDetails
    } = this.state
    // if false then click will re-render map, will then set showTripDetails to true
    if (!showTripDetails) {
      this.props.handleJourneyClick(this.props.journeyNumber, this.state.showTripDetails)
    }
    this.setState({
      showTripDetails: !showTripDetails
    })
  }

  render() {
    // console.log(this.props.journey.legs)
    const {
      legs
    } = this.props.journey


    // If there is a opal ticket category, grab the most relavant one and display
    let opalCategory;
    let opalPrice;
    if (this.props.journey.fare.tickets[0]) {
      opalCategory = ` ${this.props.journey.fare.tickets[0].properties.riderCategoryName} : `
      opalPrice = `$${this.props.journey.fare.tickets[0].properties.priceTotalFare}`
    }

    // If there is only 1 leg in the journey
    let arrivalTime;
    if (legs.length === 1) {
      arrivalTime = legs[0].destination.arrivalTimePlanned
    } else {
      arrivalTime = legs[legs.length - 1].destination.arrivalTimePlanned
    }

    const startTime = legs[0].origin.departureTimePlanned

    let originName;
    let destinationName;
    // disassembled name or name depending on what is available for Origin
    if (legs[0].origin.parent.disassembledName) {
      originName = legs[0].origin.parent.disassembledName
    } else {
      originName = legs[0].origin.name
    }
    // name for destination
    if (legs[legs.length - 1].destination.parent.disassembledName) {
      destinationName = legs[legs.length - 1].destination.parent.disassembledName
    } else {
      destinationName = legs[legs.length - 1].destination.name
    }

    return(
      <div>
        <hr/>
        <span>Trip: {this.props.journeyNumber + 1}</span>
        <div>
          <Moment format="hh:mm A">{startTime}</Moment> - <Moment format="hh:mm A">{arrivalTime}</Moment>
        </div>
        <div>
          <span className="tripTitle">{originName} to {destinationName}</span>
          <button
          className="showTrip"
          onClick={this.handleOpenClick}
          >
            {this.state.showTripDetails ?
            <span>&#9650;</span> :
            <span>&#9660;</span>
            }
          </button>
          {/* } */}

          <div className="totalDuration">
            <TotalDuration legs={this.props.journey.legs} />
          </div>
        </div>

        {this.state.showTripDetails &&
        legs.map(leg =>
          <div>
            <DisplayLegs
              leg={leg}
            />
          </div>
        )
        }

        <div>
          {opalCategory}{opalPrice}
        </div>
      </div>
    )
  }
}



export default DisplaySearch;
