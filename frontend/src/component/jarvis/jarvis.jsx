import React, { Component } from "react";
import "./jarvis.css";
import "./style.css";

import { connect } from "react-redux";

import { ApiAiClient } from "api-ai-javascript";
const accessToken = "5fa6f64523ef4168b443821a34096c76";
const client = new ApiAiClient({ accessToken });

class UnconnectedJarvis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  sendMessage = value => {
    const onSuccess = response => {
      console.log("state", this.state);
      console.log("response", response);
      const speech = response.result.fulfillment.speech;
      const newmsg = { text: speech, sender: "jarvis" };
      const user = { text: value, sender: this.props.username };
      this.setState({ messages: [...this.state.messages, user, newmsg] });
    };
    client.textRequest(value).then(onSuccess);
  };
  render() {
    return (
      <div>
        <h1>Love You 3000 </h1>

        <ul>
          {this.state.messages.map(entry => (
            <li>
              {entry.sender}:{entry.text}
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={e =>
            e.keyCode === 13 ? this.sendMessage(e.target.value) : null
          }
        />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    username: state.username
  };
};
let Jarvis = connect(mapStateToProps)(UnconnectedJarvis);
export default Jarvis;
