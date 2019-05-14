import React, { Component } from "react";
import "./custom.css";

export default class EditItem extends Component {
  render() {
    let item = this.props.item;
    return (
      <div className="flexrow ">
        <img src={item.imgUrl} width="100px" height="100px" />
        <div>
          {item.name}
          {item.price}
          <div className="flexrow spaceeven">
            <button className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn">
              Hide
            </button>
            <button className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
