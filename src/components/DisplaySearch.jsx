import React, {Component} from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

function DisplayLegs(props) {
    return (
      <h4>Time taken for leg:{props.duration}</h4>
    )
};


class DisplayJourney extends Component {
  render() {
    const { legs } = this.props
    const {
      riderCategoryName,
      priceTotalFare
    } = this.props.fare.tickets[0].properties

    let arrival;

    if ((legs.length - 1) > 0) {
      arrival =  <Moment format="hh:mm A">{legs[legs.length - 1].origin.departureTimeEstimated}</Moment>
    } else {
      arrival = <Moment format="hh:mm A">{legs[0].destination.departureTimeEstimated}</Moment>
    }


    return(
      <div>
        <hr/>
        {this.props.legs.map( leg =>
          <DisplayLegs
            duration={leg.duration}
          />
        )}
        <h3>
          Departure Time: <Moment format="hh:mm A">{legs[0].origin.departureTimeEstimated}</Moment>
        </h3>
        <h3>
          Arrival Time: {arrival}
        </h3>

        <h4>Opal {riderCategoryName}: ${priceTotalFare}</h4>
        <hr/>
      </div>
    )
  }
};

class DisplaySearch extends Component {

  render() {
    return(
      <div>
        <h1>Trips from Search...</h1>
        {this.props.journeys.map(journey =>
          <DisplayJourney
            interchanges={journey.interchanges}
            legs={journey.legs}
            fare={journey.fare}
          />
        )}
      </div>
    )
  }
};

export default DisplaySearch;
