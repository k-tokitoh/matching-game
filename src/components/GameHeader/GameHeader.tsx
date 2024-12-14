import * as React from "react";
import "./GameHeader.css";

type Props = {
  point: number;
  mistake: number;
};

export const GameHeader: React.FC<Props> = ({ point, mistake }) => {
  return (
    <ul className="GameHeader">
      <li>point: {point}</li>
      <li>mistake: {mistake}</li>
    </ul>
  );
};
