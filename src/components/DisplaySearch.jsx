import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import DisplayLegs from '../components/DisplayLegs'
import '../App.css';
import {pickerFunction} from '../lib/util'
import { Text, Button as GrommetButton, Grommet } from 'grommet';
import { Up, Down } from "grommet-icons";
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");


// Format the time to minutes or hr/mins using moment.js
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

  // toggling trip details
  handleCloseClick() {
    this.setState({
      showTripDetails: !this.state.showTripDetails
    })
  }

  // if showTripDetails isfalse then click will re-render map, will then set showTripDetails to true
  handleOpenClick() {
    const {
      showTripDetails
    } = this.state

    if (!showTripDetails) {
      this.props.handleJourneyClick(this.props.journeyNumber)
    }
    this.setState({
      showTripDetails: !showTripDetails
    })
  }

  render() {
    const {
      legs,
      fare
    } = this.props.journey

    // If there is a opal ticket category, grab the first one and display
    let opalCategory;
    let opalPrice;
    let originName;
    let destinationName;

    if (fare.tickets[0]) {
      opalCategory = ` ${fare.tickets[0].properties.riderCategoryName} : `
      opalPrice = `$${fare.tickets[0].properties.priceTotalFare}`
    }

    // If there is only 1 leg in the journey, display logic for names will change
    let arrivalTime;
    if (legs.length === 1) {
      arrivalTime = legs[0].destination.arrivalTimePlanned
    } else {
      arrivalTime = legs[legs.length - 1].destination.arrivalTimePlanned
    }

    const startTime = legs[0].origin.departureTimePlanned

    // Short name or full name depending on what is available for Origin
    if (legs[0].origin.parent.disassembledName) {
      originName = legs[0].origin.parent.disassembledName
    } else {
      originName = legs[0].origin.name
    }
    // Short name or full name depending on what is available for Destination
    if (legs[legs.length - 1].destination.parent.disassembledName) {
      destinationName = legs[legs.length - 1].destination.parent.disassembledName
    } else {
      destinationName = legs[legs.length - 1].destination.name
    }

    return(
      <div className="searchResult">
        <hr/>
        <span className="tripTime">
          Trip: {this.props.journeyNumber + 1}
          <GrommetButton
          className="showTrip"
          onClick={this.handleOpenClick}
          margin={{"left":"10px"}}
          >
            {this.state.showTripDetails ?
            <span>{<Up />}</span> :
            <span>{<Down />}</span>
            }
          </GrommetButton>
        </span>
        <div>
          <Moment format="hh:mm A">{startTime}</Moment>
           -
          <Moment format="hh:mm A">{arrivalTime}</Moment>
        </div>
        <div>
          <div className="searchNamesContainer">
            <span>
              From: {originName}
            </span>
            <span>
              To: {destinationName}
            </span>
          </div>
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
