import React, { Component } from "react";
import "./custom.css";

export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deletestatus: false
      // deleteddata: {}
    };
  }
  // componentDidMount = async () => {
  //   let response = await fetch(`/items/${this.props.id}`);
  //   let data = await response.json();

  //   this.setState({ deleteddata: data });

  //   console.table("test", data);
  // };
  handleDelete = event => {
    event.preventDefault();
    this.setState({ deletestatus: !this.state.deletestatus });
    let data = new FormData();
    data.append("isDeleted", this.state.deletestatus);

    fetch(`/items/${this.props.item._id}`, {
      method: "DELETE",
      body: data,
      credentials: "include"
    });
  };
  render() {
    let item = this.props.item;
    return (
      <div className="flexrow ">
        <img src={item.imgUrl} width="100px" height="100px" />
        <div>
          {item.name}
          {item.price}

          <div className="flexrow spaceeven">
            <button
              className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
              onClick={this.handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
