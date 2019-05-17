import React, { Component } from "react";
import "./jarvis.css";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendMessage } from "../../store.js";

class UnconnectedJarvis extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {

  //     }
  //   }
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <div>
        <h1>Love You 3000 </h1>

        <ul>
          {feed.map(entry => (
            <li>{entry.text}</li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={e =>
            e.keyCode === 13 ? sendMessage(e.target.value) : null
          }
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    feed: state.msg
  };
};

let Jarvis = connect(
  mapStateToProps,
  { sendMessage }
)(UnconnectedJarvis);
export default Jarvis;
