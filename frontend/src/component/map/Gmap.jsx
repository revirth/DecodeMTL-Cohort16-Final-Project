import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
import * as parkDate from "./skateboard-parks.json";

const API_KEY = "AIzaSyAFFJATcRf7ysRnV-vT9QWQP1cupkbgrNM";

function Map() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{ lat: 45.5087, lng: -73.554 }}>
      {parkDate.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
        >
          {/* <button
            className="marker-btn"
            onClick={e => {
              e.preventDefault();
              setSelectedPark(park);
            }}
          >
            <img src="/iconfinder_map-marker_299087.svg" alt="map icon" />
          </button> */}
        </Marker>
      ))}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function GMap() {
  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
