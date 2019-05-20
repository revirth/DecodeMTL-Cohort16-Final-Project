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
  //   let response = await fetch(`/items/${this.props.item._id}`, {
  //     method: "DELETE",
  //     body: data,
  //     credentials: "include"
  //   });
  // };
  handleDelete = event => {
    event.preventDefault();
    this.setState({ deletestatus: !this.state.deletestatus }, () => {
      let data = new FormData();
      data.append("isDeleted", this.state.deletestatus);

      fetch(`/items/${this.props.item._id}`, {
        method: "DELETE",
        body: data,
        credentials: "include"
      });
    });
  };
  render() {
    let item = this.props.item;
    return (
      // <div className="flexrow">
      //   <img src={item.imgUrl} width="100px" height="100px" />
      //   <div className="flexrow spaceeven">
      //     <span>{item.name}</span>

      //     <div>
      //       <button
      //         className="btn sub f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow settingsbtn"
      //         onClick={this.handleDelete}
      //       >
      //         {this.state.deletestatus ? "Show" : "Hide"}
      //       </button>
      //     </div>
      //   </div>
      // </div>
      <section className="tc pa3 ">
        <article
          className="hide-child relative ba b--black-20 mw5 center"
          style={{ borderRadius: "5px" }}
        >
          <img
            src={item.imgUrl}
            className="db"
            alt="Photo of Jesse Grant"
            style={{ borderRadius: "5px" }}
            height="150px"
            width="100%"
          />
          <div className="pa2 bt b--black-20">
            <p className="fw9 f4">{item.name}</p>

            <button
              className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib bttext bordercolorblue"
              onClick={this.handleDelete}
            >
              {this.state.deletestatus ? "Show" : "Hide"}
            </button>
          </div>
        </article>
      </section>
    );
  }
}
{
  /* <section className="tc pa3 pa5-ns">
  <article className="hide-child relative ba b--black-20 mw5 center">
    <img src={item.imgUrl} className="db" alt="Photo of Jesse Grant" />
    <div className="pa2 bt b--black-20">
      <a className="f6 db link dark-blue hover-blue" href="#">
        {item.name}
      </a>
      <p className="f6 gray mv1">5 mutual friends</p>
      <button
        className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1"
        onClick={this.handleDelete}
      >
        {this.state.deletestatus ? "Show" : "Hide"}
      </button>
    </div>
    <a
      className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b"
      href="#"
    >
      ×
    </a>
  </article>
</section>; */
}
