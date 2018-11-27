import React, {Component} from 'react';
// import Moment from 'react-moment';
// import 'moment-timezone';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import '../App.css'

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

class StepHtml extends Component {
  render() {
    const html = this.props.stepHtml;
    return <div>{ ReactHtmlParser(html) }</div>;
  }
}

function TransitSteps(props) {
  console.log('transit', props)
  const {
    line,
    arrival_stop,
    departure_stop,
    num_stops
  } = props.details

  return (
    <div>
      <div>
        <b>{line.name}</b>
      </div>
      {arrival_stop.name} to {departure_stop.name}, ({num_stops} stops)
    </div>
  )
}

function WalkingSteps(props) {
  console.log('walking:', props.details)
  return (
    <div>
      <ul>
        {props.details.map(step =>
          <li><StepHtml stepHtml={step.html_instructions}/></li>
        )}
      </ul>
    </div>
  )
}


function StepDetails(props) {

  const {
    steps,
    transit_details,
    travel_mode,
  } = props.step

  console.log(props.step.steps)
  let details;
  if (travel_mode === "WALKING") {
    details = steps
  } else if (travel_mode === "TRANSIT") {
    details = transit_details
  }

  return (
    <div>
      <div> --------------------------- </div>
      {travel_mode === "TRANSIT"
      ?
      <TransitSteps details={details}/>
      :
      <WalkingSteps details={details}/>
      }
      <div> --------------------------- </div>
    </div>
  )

}


class Step extends Component {

  constructor() {
    super();
    this.state = {
      showStep: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showStep: !this.state.showStep
    })
  }



  render() {
    const {
      duration,
      distance,
      instructions,
      step
    } = this.props

    // PLEASE REFACTOR THIS LATER
    return (
      <div>
        {duration.value < 80 || distance.value < 90
        ?
        null
        :
        <div>
          <span className="instructionsHeader">{instructions} : {duration.text}</span>
          <button className="instructionsButton" onClick={this.handleClick}>&#9660;</button>
          {this.state.showStep ? <StepDetails step={step}/> : null}
        </div>
        }

      </div>
    )
  }
}

function DisplaySteps(props) {
  return (
    <div>
      {props.steps.map(step =>
        <Step
          distance={step.distance}
          duration={step.duration}
          instructions={step.html_instructions}
          step={step}
          // travelMode={step.travel_mode}
        />
      )}
    </div>
  )

}


function DisplayRoutes(props) {
  const {
    departure_time,
    arrival_time,
    duration,
    distance,
    start_address,
    end_address,
    steps
  } = props.route[0]

  return (
    <div className="routeCard">
      <div className="tripTime">
        <b>{departure_time.text}</b>
      </div>
      <br/>
      <div>
        <DisplaySteps
          steps={steps}
        />
      </div>
      <div className="tripSummary">
        <span>Total Duration: {duration.text}</span> ,
        <span>Total Trip Distance: {distance.text}</span>
      </div>
    </div>
  )
}

class DisplaySearch extends Component {

  render() {
    return(
      <div classname="displaySearchResults">
        <h1>Routes from Search...</h1>
        {this.props.routes.map(route =>
          <DisplayRoutes
            route={route.legs}
          />
        )}
      </div>
    )
  }
};

export default DisplaySearch;
