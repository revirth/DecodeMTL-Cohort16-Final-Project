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

export default class ReactMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 45.501634112371455,
        longitude: -73.56862932443619,
        width: "643px",
        height: "200px",
        zoom: 15
      },

      park: null
    };
  }

  render = () => {
    console.log("state", this.state.park);
    return (
      <div className="mapctrl">
        <ReactMapGl
          {...this.state.viewport}
          mapboxApiAccessToken={TOKEN}
          mapStyle="mapbox://styles/izsk/cjvwhzzdh1v9a1cmuw1kug9bc"
          onViewportChange={viewport => {
            this.setState({ viewport: viewport });
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
                  this.setState({ park: park });
                }}
              >
                <img src="/iconfinder_map-marker_299087.svg" alt="map icon" />
              </button>
            </Marker>
          ))}
          {this.state.park ? (
            <Popup
              latitude={this.state.park.geometry.coordinates[1]}
              longitude={this.state.park.geometry.coordinates[0]}
              onClose={() => {
                this.setState({ park: null });
              }}
            >
              <div>
                <h2>{this.state.park.properties.NAME}</h2>
                <p>{this.state.park.properties.DESCRIPTION}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGl>
      </div>
    );
  };
}
