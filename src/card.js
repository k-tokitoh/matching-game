import React from 'react';

function Card(props) {
  let ret;
  switch(props.card.status) {
    case 'turnedUp':
      ret = (
        <div className="Card turnedUp" onClick={props.onClick}>
          <p>{props.card.text}</p>
        </div>
      );
      break;
    case 'turnedDown':
      ret = (
        <div className="Card turnedDown" onClick={props.onClick}></div>
      );
      break;
    case 'taken':
      ret = (
        <div className="Card taken"></div>
      );
      break;
  }
  return ret;
}

export default Card;
