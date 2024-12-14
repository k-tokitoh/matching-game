import React from "react";
import "./GameHeader.css";

function GameHeader(props) {
  return (
    <ul className="GameHeader">
      <li>point: {props.point}</li>
      <li>mistake: {props.mistake}</li>
    </ul>
  );
}

export default GameHeader;
