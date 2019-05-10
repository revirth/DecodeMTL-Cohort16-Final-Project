import "./main.css";
import "./style.css";
import React, { Component } from "react";
// import item from "./items.js";

class Itempage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundItem: {}
    };
  }
  componentDidMount = async () => {
    let response = await fetch(`/items/${this.props.id}`);
    let data = await response.json();

    this.setState({ foundItem: data });

    console.table("test", data);
  };

  render = () => {
    return (
      <div>
        <div>
          <article class="pa3 pa5-ns">
            <h1 class="f2 bold  mw5 name">{this.state.foundItem.name}</h1>
            <div className="flex flex-row-m itemdetails">
              <div>
                <img
                  src={this.state.foundItem.imgUrl}
                  class="w-100 f5 measure productimg"
                  alt="Photo of outer space"
                />
              </div>
              <div className=" flex-column-m">
                <p class="measure lh-copy">
                  {this.state.foundItem.description}
                </p>
                <button className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow">
                  Add to cart
                </button>
              </div>
            </div>
          </article>
          <div>
            <h1 class="f4 bold review mw5">Reviews</h1>
            <div className="listofreview">
              <ul class="list pl0 ml0 center  ba b--light-silver br3 ">
                <li class="ph3 pv2 bb b--light-silver">Mackeral Tabby</li>
                <li class="ph3 pv2 bb b--light-silver">Burmese</li>
                <li class="ph3 pv2 bb b--light-silver">Maine Coon</li>
                <li class="ph3 pv2 bb b--light-silver">Orange Tabby</li>
                <li class="ph3 pv2 bb b--light-silver">Siamese</li>
                <li class="ph3 pv2 bb b--light-silver">Scottish Fold</li>
                <li class="ph3 pv2">American Bobtail</li>
              </ul>
            </div>
            <form class="pa4 black-80">
              <div className="commentBox">
                <label for="comment" class="f6 b db mb2">
                  Comments <span class="normal black-60">(optional)</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  class="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                  aria-describedby="comment-desc"
                />
                <small id="comment-desc" class="f6 black-60">
                  Helper text for a form control. Can use this text to{" "}
                  <a href="#" class="link underline black-80 hover-blue">
                    link to more info.
                  </a>
                </small>
              </div>
            </form>
            <div className="pa4-l subscribeform">
              <form class="colorNews mw7 center pa4 br2-ns ba b--black-10">
                <fieldset class="cf bn ma0 pa0">
                  <legend class="pa0 f5 f4-ns mb3 black-80">
                    Sign up for our newsletter
                  </legend>
                  <div class="cf">
                    <label class="clip" for="email-address">
                      Email Address
                    </label>
                    <input
                      class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                      placeholder="Your Email Address"
                      type="text"
                      name="email-address"
                      value=""
                      id="email-address"
                    />
                    <input
                      class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns subscribebtn"
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
      </div>
    );
  };
}

export default Itempage;
