import React from "react";
import logo from "../public/logo.svg";
import "./Card.css";

function Card(props) {
  let ret;
  switch (props.card.status) {
    case "turnedUp":
      ret = (
        <div className="Card turnedUp" onClick={props.onClick}>
          <p>{props.card.text}</p>
        </div>
      );
      break;
    case "turnedDown":
      ret = (
        <div className="Card turnedDown" onClick={props.onClick}>
          <img src={logo} />
        </div>
      );
      break;
    case "taken":
      ret = <div className="Card taken"></div>;
      break;
  }
  return ret;
}

export default Card;
