import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { Polyline } from "react-google-maps";

// format of coords is [lat,lng]. need to convert to {lat:'',lng:''}
const convertLatLng = array => {
  return array.map(coords => {
    return {lat:coords[0], lng: coords[1]}
  })
}

class TripMap extends Component {

   render() {
     const {
       journeys,
       journeyNumber
     } = this.props

     let displayJourneyArray = journeys[journeyNumber].legs

     const GoogleTripMap = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: -33.89773, lng: 151.11521 } }
        defaultZoom = { 12 }
      >
        {this.props.journeys.map(journey =>
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
        )}

        {displayJourneyArray.map(leg =>
          <Polyline
            path={convertLatLng(leg.coords)}
            geodesic={true}
            options={{
              strokeColor: "#3778FF",
              strokeOpacity: '1',
              strokeWeight: 5,
              zIndex: 2
            }}
           />
        )}

      </GoogleMap>
   )));


   return(
      <div>
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
