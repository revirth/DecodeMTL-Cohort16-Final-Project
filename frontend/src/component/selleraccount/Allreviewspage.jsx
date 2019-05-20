import React, { Component } from "react";
import "./custom.css";
import "./style.css";
import { Link } from "react-router-dom";

export default class Allreviewspage extends Component {
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
          <div key={user.name}>
            <section className="mw7 center avenir">
              <h2 className="baskerville fw1 ph3 ph0-l">All reviews</h2>
              <article className="bt bb b--black-10">
                <div className="db pv4 ph3 ph0-l no-underline black">
                  <div className="flex flex-column flex-row-ns">
                    <div className="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                      <Link to={`/items/item/${user._id}`}>
                        <img
                          src={user.imgUrl}
                          className="db"
                          alt="Photo of a dimly lit room with a computer interface terminal."
                          height="250px"
                          width="250px"
                          style={{ borderRadius: "5px" }}
                        />
                      </Link>
                    </div>
                    <div className="w-100 w-60-ns pl3-ns">
                      <h1 className="f3 fw1 baskerville mt0 lh-title">
                        {user.name}
                      </h1>
                      <p className="fw9 f4">Reviews</p>
                      <p className="f6 f5-l lh-copy">
                        {user.reviews.map((review, i) => {
                          return (
                            <div key={i}>
                              {review.username + `:` + review.content}
                            </div>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </section>
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
      <div>
        <div>{this.renderUserdetails()}</div>
      </div>
    );
  }
}
