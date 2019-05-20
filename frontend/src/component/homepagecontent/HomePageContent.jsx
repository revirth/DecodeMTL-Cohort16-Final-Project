import React from "react";
import "./HomePageContent.scss";
import Actualfooter from "./actualfooter.jsx";
import logo from './imagevideo1.png';

class HomePageContent extends React.Component {
  render() {
    return (
      <div className="homecontent">
        <div className="videocontainer" data-jsx="2165040243" data-reactid="73">
          <div className="vsc-controller" data-vscid="4rvi0manm" />
          <video
            src="//cms.chobanifoodservice.com/assets/Chobani_Loop_7.mp4"
            autoPlay
            className="muted video"
            loop
            playsInline=""
            data-jsx="2165040243"
            data-reactid="74"
            data-vscid="4rvi0manm"
            width="100%"
            height="780"
          />
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="row align-items-center" id="blockof3">
          <div className="col-md-4 hello">
            <p>
              {" "}
              <span className="redish">DELIVERY</span>
              <div />
              <span>SATUDRAY AND SUNDAY</span>
            </p>
          </div>

          <div className="col-md-4 hello">
            <p>
              {" "}
              <span className="redish">20% OFF</span>
              <br />
              <span>FOR ORDERS OVER 100$</span>
            </p>
          </div>

          <div className="col-md-4">
            <p>
              {" "}
              <span className="redish">DROP POINTS</span>
              <div />
              <span>MORE THAN YOU CAN HANDLE</span>
            </p>
          </div>
        </div>
        <div className="socialmedias">
          <i className="facebooks" className="fab fa-facebook-square" />
          <i className="twitters" className="fab fa-twitter-square" />
          <i className="instagrams" className="fab fa-instagram" />
        </div>

        <div className="row align-items-center" id="blockof4">
          <div className="col-md-4 hello">
            <p>
              {" "}
              <span className="redish">WEEKLY MENU</span>
              <div />
              <span>EVERY THURSDAY</span>
            </p>
          </div>
          <div className="col-md-4 hello">
            <p>
              {" "}
              <span className="redish">FITNESS MENU</span>
              <br />
              <span>TAILORED FOR YOUR GOALS</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              {" "}

              <span className="redish">PRE-COOKED MEAT</span>
              <div />
              <span>DON'T WASTE TIME</span>
            </p>
          </div>
        </div>
        <div className="services">
          <div className="box1">
            <div id="box2">
              <i className="fas fa-users fa-5x" />
              <p>You are an athlete or have very specific needs ?</p>
              <p>We have a Fitness menu that is customisable</p>
              <p>We guarantee your we can satisfy the pickest !</p>
            </div>
            <div>
              <i className="fas fa-dumbbell fa-5x" />
              <p>You are an athlete or have very specific needs ?</p>
              <p>We have a Fitness menu that is customisable</p>
              <p>We guarantee your we can satisfy the pickest !</p>
            </div>
          </div>
          <div className="box1">
            <div>
              <i className="fas fa-child fa-5x" />
              <p>You are an athlete or have very specific needs ?</p>
              <p>We have a Fitness menu that is customisable</p>
              <p>We guarantee your we can satisfy the pickest !</p>
            </div>
            <div>
              <i className="fas fa-drumstick-bite fa-5x" />
              <p>You are an athlete or have very specific needs ?</p>
              <p>We have a Fitness menu that is customisable</p>
              <p>We guarantee your we can satisfy the pickest !</p>
            </div>
          </div>
        </div>

        <Actualfooter />
      </div>
    );
  }
}

export default HomePageContent;
