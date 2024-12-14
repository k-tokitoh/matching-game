import * as React from "react";
import logo from "~public/logo.svg";
import "./Card.css";

type Props = {
  readonly card: {
    readonly status: "turnedUp" | "turnedDown" | "taken";
    readonly text: string;
  };
  readonly onClick: () => void;
};

export const Card: React.FC<Props> = ({ card, onClick }) => {
  switch (card.status) {
    case "turnedUp":
      return (
        <div className="card up" onClick={onClick}>
          <p>{card.text}</p>
        </div>
      );
    case "turnedDown":
      return (
        <div className="card down" onClick={onClick}>
          <img src={logo} alt="Logo" />
        </div>
      );
    case "taken":
      return <div className="card taken"></div>;
    default:
      return null;
  }
};
