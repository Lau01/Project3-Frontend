import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { Button as GrommetButton } from 'grommet';

//  Format the stop times using Moment.js
function StopsColumn(props) {
  return (
      <div>
        <span className="stopTimes"><Moment format="hh:mm A">{props.time}</Moment></span>

        <span className="stopNames">{props.stopName}</span>
      </div>
  )
}

// LegDetails is a stateless functional component
// Display logic for the different type of travel types (dependent on Trip Planner API)
// 1: Train
// 4: Light Rail
// 5: Bus
// 7: Coach
// 9: Ferry
// 11: School Bus
// 99 and 100: Walk
function LegDetails(props) {

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
  } else if( legType === 1 || legType === 5 || legType === 9){
    // TRAIN or BUS or Ferry
    return (
      <div>
        {props.leg.stopSequence.map(step =>
          step.arrivalTimePlanned
          ?
          <StopsColumn
            time={step.arrivalTimePlanned}
            stopName={step.name}
          />
          :
          null
        )}
      </div>
    );
  } else {
    // For other legs types
    return <div>Leg type { legType } not supported yet</div>;
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

  // have to take away first and last array elements of the path description if it is a walking route to prevent errors
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

  // Toggle state for displaying the detailed steps of a trip
  handleClick() {
    this.setState({
      showStep: !this.state.showStep
    })
  }

  render() {
    const { origin } = this.props.leg

    const {
      walkPath,
      showStep
    } = this.state

    return (
      <div className='tripLegs'>
        <ul>
          <li>
            <span>{origin.name}</span>
            {walkPath.length === 0 &&
              <GrommetButton
              className="showDetailsButton"
              onClick={this.handleClick}
              margin={{"left":"10px"}}
              >
                {showStep ?
                  <span className="showButtonText">Show Less</span>
                  :
                  <span className="showButtonText">Show More</span>
                }
              </GrommetButton>
            }

            {this.state.walkPath.length > 0 &&
            <div>
              {this.props.leg.transportation.number}  {this.props.leg.transportation.description}
            </div>
            }

            {showStep &&
            <LegDetails leg={this.props.leg} walkPath={walkPath} />
            }
          </li>
        </ul>
      </div>
    )
  }
}

export default DisplayLegs;
