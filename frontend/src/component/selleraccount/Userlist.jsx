import React, { Component } from "react";
import "./custom.css";
import "./style.css";

export default class Userlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUsers: []

      // deleteddata: {}
    };
  }
  renderUserdetails = () => {
    return this.state.dataUsers.map(user => {
      return (
        <div>
          <div className="flexrow">
            <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
              <div class="tc">
                <h1 class="f4">{user.username}</h1>
                <hr class="mw3 bb bw1 b--black-10" />
              </div>
              <p class="lh-copy measure center f6 black-70">
                <span>Email : {user.email} </span>
                <div>
                  Street : {user.street} <br />
                  Apt no : {user.apt}
                  Postal Code : {user.postal}
                  Phone No : {user.phone}
                </div>
              </p>
            </article>
          </div>
        </div>
      );
    });
  };
  componentDidMount = async () => {
    let response = await fetch(`/users`);
    let data = await response.json();

    this.setState({ dataUsers: data });

    console.table("test", data);
  };

  render() {
    return (
      <div className="overlay">
        <div className=" center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 w3-animate-bottom flexlist">
          {this.renderUserdetails()}
        </div>
      </div>
    );
  }
}
