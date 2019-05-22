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
      messages: [],
      comment: "",
      typing: false
    };
  }
  scrollBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chatid"
    });
  };

  sendMessage = value => {
    const user = { text: value, sender: this.props.username };
    this.setState(
      { messages: [...this.state.messages, user], comment: "", typing: true },
      this.scrollBottom
    );
    client.textRequest(value).then(response => {
      const speech = response.result.fulfillment.speech;
      const newmsg = { text: speech, sender: "jarvis" };

      setTimeout(() => {
        this.setState(
          {
            messages: [...this.state.messages, newmsg],
            comment: "",
            typing: false
          },
          this.scrollBottom
        );
      }, 300);
    });
  };
  typeComment = event => {
    event.preventDefault();
    this.setState({ comment: event.target.value });
  };
  render() {
    return (
      <div className="overlay3">
        <div className="w3-animate-bottom3">
          <div className="login-form-div4">
            <i class="far fa-comments" />
            <h1>Customer Support</h1>
          </div>
          <div className="login-form-div3" id="chatid">
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
                      <div className="usermsg">
                        {entry.text} :{entry.sender}
                      </div>
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
          </div>
          <div className="login-form-div5">
            <input
              type="text"
              className="chatmsg"
              onChange={this.typeComment}
              onKeyDown={e =>
                e.keyCode === 13 ? this.sendMessage(e.target.value) : null
              }
              value={this.state.comment}
              placeholder="Type your message"
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
