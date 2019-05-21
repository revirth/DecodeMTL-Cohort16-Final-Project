import React, { Component } from "react";
import "./jarvis.css";
import "./style.css";

import { connect } from "react-redux";
import { animateScroll } from "react-scroll";

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
  scrollBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chatid"
    });
  };

  sendMessage = value => {
    const onSuccess = response => {
      console.log("state", this.state);
      console.log("response", response);
      const speech = response.result.fulfillment.speech;
      const newmsg = { text: speech, sender: "jarvis" };
      const user = { text: value, sender: this.props.username };
      this.setState(
        { messages: [...this.state.messages, user, newmsg] },
        this.scrollBottom
      );
    };
    client.textRequest(value).then(onSuccess);
  };
  render() {
    return (
      <div className="overlay3">
        <div className="w3-animate-bottom3">
          <div className="login-form-div3" id="chatid">
            <h1>Customer Support</h1>
            <ul className="jarvisul">
              {this.state.messages.map(entry =>
                entry.sender === "jarvis" ? (
                  <li class="container1">
                    <p>
                      {entry.sender}: {entry.text}
                    </p>
                  </li>
                ) : (
                  <li class="container2">
                    <p>
                      {entry.text} :{entry.sender}
                    </p>
                  </li>
                )
              )}
            </ul>
            {/* <ul>
              {this.state.messages.map(entry => (
                <li>
                  {entry.sender}:{entry.text}
                </li>
              ))}
            </ul> */}
            <input
              type="text"
              onKeyDown={e =>
                e.keyCode === 13 ? this.sendMessage(e.target.value) : null
              }
            />
          </div>
        </div>
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
