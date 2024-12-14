import { ReactNode } from "react";
import * as React from "react";
import logo from "~public/logo.svg";
import * as styles from "./Card.module.css";

type Status = "up" | "down" | "taken";

export type CardData = {
  readonly status: Status;
  readonly text: string;
};

type Props = {
  readonly cardData: CardData;
  readonly onClick: () => void;
};

type Attr = {
  readonly className: keyof typeof styles;
  readonly clickable: boolean;
  readonly renderContent: (text: string) => ReactNode;
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

export const Card: React.FC<Props> = ({ cardData, onClick }) => {
  const { className, clickable, renderContent } = attrs[cardData.status];

  return (
    <div
      className={`${styles.card} ${styles[className]}`}
      onClick={clickable ? onClick : undefined}
    >
      {renderContent(cardData.text)}
    </div>
  );
};
