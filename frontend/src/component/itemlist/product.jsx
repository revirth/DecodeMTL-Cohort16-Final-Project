import React from "react";
import addItemToCart from "./addItemToCart";
import "./main.css";
import "./style.css";
import { BrowserRouter, Route, Link } from "react-router-dom";

let onClickHandle = e => {};

const Product = ({ _id, name, description, imgUrl, price }) => {
  let showDesc = "";
  return (
    <article
      className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center articlediv"
      id={_id}
    >
      <img
        src={imgUrl}
        className="db w-100 br2 br--top"
        alt="Photo of a kitten looking menacing."
        title={name}
        height="200px"
        width="100px"
      />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{name}</h1>
          </div>
          <div className="dtc tr">
            <h2 className="f5 mv0">{price}</h2>
          </div>
        </div>
        <p className="f6 lh-copy measure mt2 mid-gray">
          {description.substring(0, 200)}
        </p>
        <div className="btn1">
          <button
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow btncart"
            onClick={() => addItemToCart(_id)}
          >
            Add to cart
            <i class="fas fa-cart-plus" />
          </button>

          <Link
            className="f6 link dim br3 ph3 pv2 mb2 dib white bg-dark-green bn grow moreLinks"
            to={`/items/${_id}`}
          >
            More Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Product;
