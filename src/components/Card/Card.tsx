import * as React from "react";
import logo from "~public/logo.svg";
import "./Card.css";

type Status = "up" | "down" | "taken";

type Props = {
  readonly card: {
    readonly status: Status;
    readonly text: string;
  };
  readonly onClick: () => void;
};

type Attr = {
  readonly className: string;
  readonly clickable: boolean;
  readonly renderContent: (text: string) => JSX.Element;
};

const attrs = {
  up: {
    className: "up",
    clickable: true,
    renderContent: (text: string) => <p>{text}</p>,
  },
  down: {
    className: "down",
    clickable: true,
    renderContent: () => <img src={logo} alt="" />,
  },
  taken: {
    className: "taken",
    clickable: false,
    renderContent: () => undefined,
  },
} as const satisfies { [key in Status]: Attr };

export const Card: React.FC<Props> = ({ card, onClick }) => {
  const { className, clickable, renderContent } = attrs[card.status];

  return (
    <div
      className={`card ${className}`}
      onClick={clickable ? onClick : undefined}
    >
      {renderContent(card.text)}
    </div>
  );
};
