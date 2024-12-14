import * as React from "react";
import { Game } from "../Game/Game";
import * as styles from "./App.module.css";

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Game />
    </div>
  );
};
