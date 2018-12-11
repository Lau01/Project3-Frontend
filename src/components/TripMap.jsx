import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Polyline } from "react-google-maps";
import {convertLatLng} from '../lib/util'

// format of coords is [lat,lng]. need to convert to {lat:'',lng:''}. Import convertLatLng from lib/util folder.

class TripMap extends Component {

  // Prevent map from re-rendering on every state change. Component will only update if the journeys change
  shouldComponentUpdate(nextProps, nextState){
    if (this.props.journeys[0] === nextProps.journeys[0]){
      return false
    } else {
      return true
    }
  }

   render() {

   const {
     journeys,
     journeySelected
   } = this.props

   const GoogleTripMap = withScriptjs(withGoogleMap(props => (
    <GoogleMap
      defaultCenter = { { lat: -33.89773, lng: 151.11521 } }
      defaultZoom = { 12 }
    >
      {this.props.journeys.length > 0 &&
        this.props.journeys.map(journey =>
          journey.legs.map(leg =>
            <Polyline
              path={convertLatLng(leg.coords)}
              geodesic={true}
              options={{
                strokeColor: "#9c9595",
                strokeOpacity: '0.5',
                strokeWeight: 4,
                zIndex: 1
              }}
            />
          )
        )
      }
      {this.props.journeys.length > 0 &&
        journeys[journeySelected].legs.map(leg =>
          <Polyline
            path={convertLatLng(leg.coords)}
            geodesic={true}
            options={{
              strokeColor: "#7D4CDB",
              strokeOpacity: '1',
              strokeWeight: 5,
              zIndex: 2
            }}
          />
        )
      }

    </GoogleMap>
  ))); //GoogleTripMap


   return(
      <div className="tripMap">
        <GoogleTripMap
          googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBND5ksDpE8U7IRPTOobQXYIwGckHeYxRs"}
          loadingElement={<div style={{height: '100%'}} />}
          containerElement={ <div style={{ height: '100%', width: '100%' }} /> }
          mapElement={ <div style={{ height: '100%' }} /> }
        />
      </div>
   );
   }
};
export default TripMap;
