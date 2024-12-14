import * as React from "react";
import "./ScoreBoard.css";

type Props = {
  point: number;
  mistake: number;
};

export const ScoreBoard: React.FC<Props> = ({ point, mistake }) => {
  return (
    <ul className="game-header">
      <li>point: {point}</li>
      <li>mistake: {mistake}</li>
    </ul>
  );
};
