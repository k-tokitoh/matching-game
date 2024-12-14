import * as React from "react";
import * as styles from "./ScoreBoard.module.css";

type Props = {
  point: number;
  mistake: number;
};

export const ScoreBoard: React.FC<Props> = ({ point, mistake }) => {
  return (
    <ul className={styles["game-header"]}>
      <li>point: {point}</li>
      <li>mistake: {mistake}</li>
    </ul>
  );
};
