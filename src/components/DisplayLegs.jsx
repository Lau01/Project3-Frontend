import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

function StopsColumn(props) {
  return (
      <div>
        <span className="stopTimes"><Moment format="hh:mm A">{props.time}</Moment></span>

        <span className="stopNames">{props.stopName}</span>
      </div>
  )
}


function LegDetails(props) {
  console.log(props.leg.stopSequence[1])

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
            <StopsColumn time={step.arrivalTimePlanned} stopName={step.name}/>
            :
            null
        )}
      </div>
    );
  } else {
    // For other legs types to be added
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

    return (
      <div>
        <ul>
          <li>
            <span>{origin.name}</span>
            {walkPath.length === 0 &&
              <button className="showDetailsButton" onClick={this.handleClick}>
                Show Details
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

export default DisplayLegs;
