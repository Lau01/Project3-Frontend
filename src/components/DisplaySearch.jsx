import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../App.css';
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
// typeof moment.duration.fn.format === "function";
// // true
// typeof moment.duration.format === "function";
// // true

// function DisplayLegs(props) {
//   const {
//     duration,
//     transportation,
//     origin,
//     destination
//   } = props
//
//   let transportType;
//   let minutes;
//   minutes = Math.ceil(parseInt(duration)/60)
//   if (transportation.product.name) {
//     transportType = transportation.product.name
//   } else if (transportation.name) {
//     transportType = transportation.name
//   }
//
//   return (
//     <div>
//       <h4>{minutes} minutes on {transportType}</h4>
//       <h4><Moment format="hh:mm A">{origin.departureTimePlanned}</Moment> to <Moment format="hh:mm A">{destination.arrivalTimePlanned}</Moment></h4>
//       <h4>_________________________________</h4>
//     </div>
//   )
// };
//
//
// class DisplayJourney extends Component {
//   render() {
//     const { legs } = this.props
//     const {
//       riderCategoryName,
//       priceTotalFare
//     } = this.props.fare.tickets[0].properties
//
//     let arrival;
//     let opal;
//     let legArray = [];
//
//     if (legs.length > 1) {
//       arrival =  <Moment format="hh:mm A">{legs[legs.length - 1].destination.arrivalTimePlanned}</Moment>
//     } else {
//       arrival =  <Moment format="hh:mm A">{legs[0].destination.arrivalTimePlanned}</Moment>
//     }
//
//
//     // CAN CALCULATE ARRIVAL TIME ESTIMATED DIFFERENCE TO GET IF TRAIN IS LATE
//
//     if (priceTotalFare === '0.00') {
//       opal = null;
//     } else {
//       opal = `${riderCategoryName}: $${priceTotalFare}`
//     }
//
//     return(
//       <div>
//         <hr/>
//         <h3>
//           Trip: <Moment format="hh:mm A">{legs[0].origin.departureTimePlanned}</Moment> - {arrival}
//         </h3>
//
//         <h4>----------------------</h4>
//
//         {this.props.legs.map( leg =>
//           <DisplayLegs
//             origin={leg.origin}
//             destination={leg.destination}
//             duration={leg.duration}
//             transportation={leg.transportation}
//           />
//         )}
//
//         <h4>{opal}</h4>
//       </div>
//     )
//   }
// };
//
// class DisplayJourney extends Component {
//   render() {
//     return(
//       <div>
//       </div>
//     )
//   }
// };


// function Sequence(props) {
//   switch(props) {
//     case (props.class === 1):
//       return <TrainSequence stopSequence={props.leg.stopSequence} />;
//     case (props.class === 100):
//       return <WalkSequence pathDescription={props.leg.pathDescription}/>;
//     default:
//       return null;
//   }
// }

function StopsColumn(props) {
  return (
      <div>
        <span className="stopTimes"><Moment format="hh:mm A">{props.time}</Moment></span>

        <span className="stopNames">{props.stopName}</span>
      </div>
  )
}


function LegDetails(props) {
  // console.log(props.leg.pathDescriptions)

  const legType = props.leg.transportation.product.class;

  if( legType === 100 || legType === 99 ){
    // WALKING
    return (
      <div>
        <span>Walk Path</span>
        <ul>
          {props.walkPath.map(step =>
            <li>{step.manoeuvre} {step.turnDirection} on {step.name}</li>
          )}
        </ul>
      </div>
    );
  } else if( legType === 1 || legType === 5){
    // TRAIN
    return (
      <div>
        {/* {legType === 1 ? <span>Train Stops</span> : <span>Bus Stops</span>} */}
        {props.leg.stopSequence.map(step =>
            step.arrivalTimePlanned
            ?
            <StopsColumn time={step.arrivalTimePlanned} stopName={step.parent.disassembledName}/>
            :
            null
        )}
      </div>
    );
  } else {
    // not handled? what to show?
    return <div>Leg type { legType } not supported yet...</div>;
  }



}

class DisplayLegs extends Component {
  constructor() {
    super();
    this.state = {
      walkPath: [],
      showStep: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let walkPath = [];
    if (this.props.leg.pathDescriptions) {
      walkPath = this.props.leg.pathDescriptions;
      walkPath.shift();
      walkPath.pop();
      this.setState({
        walkPath: walkPath
      })
    }

    // if (this.props.leg.)
  }

  handleClick() {
    this.setState({
      showStep: !this.state.showStep
    })
  }

  render() {
    const {
      origin,
      destination
    } = this.props.leg

    const {
      walkPath,
      showStep
    } = this.state



    // let transportDetails = '';
    // console.log(this.state.walkPath.length)
    // if (this.state.walkPath.length > 0) {
    //   transportDetails = `${this.props.leg.transportation.number} ${this.props.leg.transportation.description}`
    // } else {
    //   transportDetails = '';
    // }

    // console.log(transportDetails)

    return (
      <div>
        <ul>
          <li>
            <span>{origin.name}</span>
            {walkPath.length === 0 &&
              <button className="showDetailsButton" onClick={this.handleClick}>
                &#9660;
              </button>
            }

            {this.state.walkPath.length > 0 &&
            <div>
            {this.props.leg.transportation.number}  {this.props.leg.transportation.description}
            </div>
            }

            {showStep &&
            <LegDetails leg={this.props.leg} walkPath={walkPath} />
            }
            {/* <div>{destination.name}</div> */}
          </li>
        </ul>
      </div>
    )
  }
}

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
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showTripDetails: !this.state.showTripDetails
    })
  }

  render() {
    const {
      legs
    } = this.props.journey


    // If there is a opal ticket category, grab the most relavant one and display
    let opalCategory;
    let opalPrice;
    if (this.props.journey.fare.tickets[0]) {
      opalCategory = `${this.props.journey.fare.tickets[0].properties.riderCategoryName}: `
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
        <div>
          <Moment format="hh:mm A">{startTime}</Moment> - <Moment format="hh:mm A">{arrivalTime}</Moment>
        </div>
        <div>
          {originName} to {destinationName}
          <button className="showTrip" onClick={this.handleClick}>Show Trip</button>
          <span className="totalDuration"><TotalDuration legs={this.props.journey.legs}/></span>
        </div>
        {this.state.showTripDetails &&
        legs.map(leg =>
          <div>
            <DisplayLegs leg={leg}/>
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


// GOOGLE VERSION
// class StepHtml extends Component {
//   render() {
//     const html = this.props.stepHtml;
//     return <div>{ ReactHtmlParser(html) }</div>;
//   }
// }
//
// function TransitSteps(props) {
//   console.log('transit', props)
//   const {
//     line,
//     arrival_stop,
//     departure_stop,
//     num_stops
//   } = props.details
//
//   return (
//     <div>
//       <div>
//         <b>{line.name}</b>
//       </div>
//       {arrival_stop.name} to {departure_stop.name}, ({num_stops} stops)
//     </div>
//   )
// }
//
// function WalkingSteps(props) {
//   console.log('walking:', props.details)
//   return (
//     <div>
//       <ul>
//         {props.details.map(step =>
//           <li><StepHtml stepHtml={step.html_instructions}/></li>
//         )}
//       </ul>
//     </div>
//   )
// }
//
//
// function StepDetails(props) {
//
//   const {
//     steps,
//     transit_details,
//     travel_mode,
//   } = props.step
//
//   console.log(props.step.steps)
//   let details;
//   if (travel_mode === "WALKING") {
//     details = steps
//   } else if (travel_mode === "TRANSIT") {
//     details = transit_details
//   }
//
//   return (
//     <div>
//       <div> --------------------------- </div>
//       {travel_mode === "TRANSIT"
//       ?
//       <TransitSteps details={details}/>
//       :
//       <WalkingSteps details={details}/>
//       }
//       <div> --------------------------- </div>
//     </div>
//   )
//
// }
//
//
// class Step extends Component {
//
//   constructor() {
//     super();
//     this.state = {
//       showStep: false
//     }
//
//     this.handleClick = this.handleClick.bind(this);
//   }
//
//   handleClick() {
//     this.setState({
//       showStep: !this.state.showStep
//     })
//   }
//
//
//
//   render() {
//     const {
//       duration,
//       distance,
//       instructions,
//       step
//     } = this.props
//
//     // PLEASE REFACTOR THIS LATER
//     return (
//       <div>
//         {duration.value < 80 || distance.value < 90
//         ?
//         null
//         :
//         <div>
//           <span className="instructionsHeader">{instructions} : {duration.text}</span>
//           <button className="instructionsButton" onClick={this.handleClick}>&#9660;</button>
//           {this.state.showStep ? <StepDetails step={step}/> : null}
//         </div>
//         }
//
//       </div>
//     )
//   }
// }
//
// function DisplaySteps(props) {
//   return (
//     <div>
//       {props.steps.map(step =>
//         <Step
//           distance={step.distance}
//           duration={step.duration}
//           instructions={step.html_instructions}
//           step={step}
//           // travelMode={step.travel_mode}
//         />
//       )}
//     </div>
//   )
//
// }
//
//
// function DisplayRoutes(props) {
//   const {
//     departure_time,
//     arrival_time,
//     duration,
//     distance,
//     start_address,
//     end_address,
//     steps
//   } = props.route[0]
//
//   return (
//     <div className="routeCard">
//       <div className="tripTime">
//         <b>{departure_time.text}</b>
//       </div>
//       <br/>
//       <div>
//         <DisplaySteps
//           steps={steps}
//         />
//       </div>
//       <div className="tripSummary">
//         <span>Total Duration: {duration.text}</span> ,
//         <span>Total Trip Distance: {distance.text}</span>
//       </div>
//     </div>
//   )
// }
//
// // DISPLAYSEARCH FOR GOOGLE VERSION
// // class DisplaySearch extends Component {
// //
// //   render() {
// //     return(
// //       <div classname="displaySearchResults">
// //         <h1>Routes from Search...</h1>
// //         {this.props.routes.map(route =>
// //           <DisplayRoutes
// //             route={route.legs}
// //           />
// //         )}
// //       </div>
// //     )
// //   }
// // };
// GOOGLE VERSION END



export default DisplaySearch;
