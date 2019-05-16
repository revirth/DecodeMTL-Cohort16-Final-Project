import React, { Component } from "react";
import "./custom.css";
import "./style.css";

export default class Allreviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []

      // deleteddata: {}
    };
  }
  renderUserdetails = () => {
    return this.state.items.map(user => {
      if (user.reviews.length !== 0) {
        return (
          <div className="w3-animate-bottom">
            <div className="flexrow">
              <article class="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div class="tc">
                  <img
                    src={user.imgUrl}
                    class="br-100 h3 w3 dib"
                    title="Photo of a kitty staring at you"
                  />
                  <h1 class="f4">{user.name}</h1>
                  <hr class="mw3 bb bw1 b--black-10" />
                </div>
                <p class="lh-copy measure center f6 black-70">
                  {user.reviews.map(review => {
                    return <div>{review.username + `:` + review.content}</div>;
                  })}{" "}
                  :
                </p>
              </article>
            </div>
          </div>
        );
      }
    });
  };
  componentDidMount = async () => {
    let reviews = await fetch(`/reviews`).then(response => response.json());
    let itemsObject = await fetch(`/items?limit=1000`).then(response =>
      response.json()
    );
    let items = itemsObject.items;
    console.log("REVIEWS", reviews);
    console.log("ITEMS", items);

    let alldetails = items.map(item => {
      let itemreviews = reviews.filter(review => {
        return review.itemId === item._id;
      });
      return { ...item, reviews: itemreviews };
    });
    console.log("ALL DETAILS", alldetails);
    this.setState({ items: alldetails });
  };

  render() {
    return (
      <div className="overlay">
        <div className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 flexlist">
          {this.renderUserdetails()}
        </div>
      </div>
    );
  }
}
