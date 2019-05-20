import "./main.css";
import "./style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import addItemToCart from "./addItemToCart";
import LoginPopup from "../login/LoginPopup";
// import item from "./items.js";

class UnconnectedItempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundItem: {},
      reviews: [],
      comment: "",
      LoginPopup: false
    };
  }
  componentDidMount = async () => {
    let response = await fetch(`/items/${this.props.id}`);
    let data = await response.json();

    this.setState({ foundItem: data });

    // console.table("test", data);
    let reviews = await fetch(`/items/${this.props.id}/reviews`);
    let review = await reviews.json();
    // review = review.filter(rev => {
    //   return rev.itemId === this.state.foundItem._id;
    // });

    this.setState({ reviews: review });

    // console.table("review", review);
  };
  handleComment = event => {
    this.setState({ comment: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append("content", this.state.comment);
    data.append("itemId", this.state.foundItem._id);

    fetch("/reviews", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (!res.status) alert(res.message);
        return fetch(`/items/${this.props.id}/reviews`)
          .then(res => res.json())
          .then(res => {
            console.log("res", res);
            this.setState({ reviews: res, comment: "" });
          });
      });
  };

  onClickAddItemToCart = itemId => {
    if (this.props.loggedIn) {
      addItemToCart(itemId);
    } else {
      this.setState({ loginPopup: true });
    }
  };

  closeLoginPopup = () => {
    this.setState({ loginPopup: false });
  };

  render = () => {
    return (
      <div>
        <div>
          <article className="pa3 pa5-ns">
            <h1 className="f2 bold  mw5 name">{this.state.foundItem.name}</h1>
            <div className="flex flex-row-m itemdetails">
              <div>
                <img
                  src={this.state.foundItem.imgUrl}
                  className="w-100 f5 measure productimg"
                  alt="Photo of outer space"
                />
              </div>
              <div className=" flex-column-m">
                <p className="measure lh-copy">
                  {this.state.foundItem.description}
                </p>
                <button
                  className="f6 link dim br3 ph3 pv2 mb2 dib white btcolor bn grow"
                  // onClick={() => addItemToCart(this.state.foundItem._id)}
                  onClick={() => {
                    this.onClickAddItemToCart(this.state.foundItem._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </article>
          <div>
            <h1 className="f4 bold review mw5">Reviews</h1>
            <div className="listofreview">
              <ul className="list pl0 ml0 center  ba b--light-silver br3 reviewlist ">
                {this.state.reviews.map((r, i) => (
                  <li key={i} className="ph3 pv2 bb b--light-silver">
                    {r.username} : {r.content}
                  </li>
                ))}
              </ul>
            </div>
            <form className="pa4 black-80" onSubmit={this.handleSubmit}>
              <div className="commentBox">
                <div className="flex">
                  <div>
                    <label htmlFor="comment" className="f6 b db mb2">
                      Comments{" "}
                      <span className="normal black-60">(optional)</span>
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2 txtarea"
                      aria-describedby="comment-desc"
                      onChange={this.handleComment}
                      value={this.state.comment}
                    />
                  </div>
                  <input
                    type="submit"
                    className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib bttext radiusgreen"
                    value="Submit"
                  />
                </div>

                <p id="comment-desc" className="f6 black-60">
                  Helper text for a form control. Can use this text to{" "}
                  <a href="#" className="link underline black-80 hover-blue">
                    link to more info.
                  </a>
                </p>
              </div>
            </form>
            <div className="pa4-l subscribeform">
              <form className="colorNews mw7 center pa4 br2-ns ba b--black-10">
                <fieldset className="cf bn ma0 pa0">
                  <legend className="pa0 f5 f4-ns mb3 black-80">
                    Sign up for our newsletter
                  </legend>
                  <div className="cf">
                    <label className="clip" htmlFor="email-address">
                      Email Address
                    </label>
                    <input
                      className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns subscribetxt"
                      placeholder="Your Email Address"
                      type="text"
                      name="email-address"
                      id="email-address"
                    />
                    <input
                      className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns subscribebtn"
                      type="submit"
                      value="Subscribe"
                    />
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="footergap" />
          </div>
        </div>
        {this.state.loginPopup ? (
          <LoginPopup onClose={this.closeLoginPopup} />
        ) : null}
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

let Itempage = connect(mapStateToProps)(UnconnectedItempage);

export default Itempage;
