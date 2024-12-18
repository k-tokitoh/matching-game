import * as React from "react";

import { Card as CardComponent } from "../Card/Card";
import { ScoreBoard } from "../ScoreBoard/ScoreBoard";

import * as styles from "./Game.module.css";
import { useGame } from "./useGame";

type Props = {
  randomize?: boolean;
};

export const Game: React.FC<Props> = ({ randomize = true }) => {
  const { point, mistake, cards, onCardClick, onClick } = useGame({
    randomize,
  });

  return (
    <div className={styles.game} onClick={onClick}>
      <ScoreBoard point={point} mistake={mistake} />
      <div className={styles.cards}>
        {cards.map((card) => (
          <CardComponent
            cardData={card}
            onClick={() => onCardClick(card)}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
};
