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
        <div className="Card turnedUp" onClick={onClick}>
          <p>{card.text}</p>
        </div>
      );
    case "turnedDown":
      return (
        <div className="Card turnedDown" onClick={onClick}>
          <img src={logo} alt="Logo" />
        </div>
      );
    case "taken":
      return <div className="Card taken"></div>;
    default:
      return null;
  }
};
