import React, { Component, useState } from "react";
import "./map.css";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendMessage } from "../../store.js";
import ReactMapGl from "react-map-gl";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import * as parkDate from "./skateboard-parks.json";
const TOKEN =
  "pk.eyJ1IjoiaXpzayIsImEiOiJjanZ1MzJvdzUzbjVrNDl1aW9wZDJ2dXF0In0.Tg1rHLLlAnktM-G_VX-MJw";

export default function ReactMap() {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   }
  // }

  const [viewport, setViewport] = useState({
    latitude: 45.501634112371455,
    longitude: -73.56862932443619,
    width: "50vw",
    height: "50vh",
    zoom: 10
  });

  const [selectedPark, setSelectedPark] = useState(null);
  // useEffect(() => {
  //   const listener = e => {
  //     if (e.key === "Escape") {
  //       setSelectedPark(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);

  //   return () => {
  //     window.removeEventListener("keydown", listener);
  //   };
  // }, []);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/izsk/cjvu7n87p30vc1cnz6u2o1pad"
      onViewportChange={viewport => {
        setViewport(viewport);
      }}
    >
      {/* <NavigationControl /> */}

      {parkDate.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          latitude={park.geometry.coordinates[1]}
          longitude={park.geometry.coordinates[0]}
        >
          <button
            className="marker-btn"
            onClick={e => {
              e.preventDefault();
              setSelectedPark(park);
            }}
          >
            <img src="/iconfinder_map-marker_299087.svg" alt="map icon" />
          </button>
        </Marker>
      ))}
      {selectedPark ? (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      ) : null}
    </ReactMapGl>
  );
}
