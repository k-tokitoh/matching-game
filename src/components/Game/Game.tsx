import * as React from "react";
import { Card } from "../Card/Card";
import { GameHeader } from "../GameHeader/GameHeader";
import "./Game.css";

type TCard = {
  id: number;
  text: string;
  status: "turnedUp" | "turnedDown" | "taken";
};

export const Game: React.FC = () => {
  const initCards = () => {
    let chars = [];
    // AからFまでを2つずつ
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        chars.push(String.fromCodePoint("A".charCodeAt() + i));
      }
    }
    // ランダムに並び替え
    for (var i = chars.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = chars[i];
      chars[i] = chars[r];
      chars[r] = tmp;
    }
    const cards = chars.map((char, index) => {
      return { id: index, text: char, status: "turnedDown" };
    });
    return cards;
  };

  const [cards, setCards] = React.useState<Array<TCard>>(initCards());
  const [point, setPoint] = React.useState(0);
  const [mistake, setMistake] = React.useState(0);

  const turnedUpCards = () => {
    return cards.filter((card) => card.status === "turnedUp");
  };

  const judge = () => {
    const success =
      [...new Set(turnedUpCards().map((card) => card.text))].length === 1;
    if (success) {
      setPoint(point + 1);
    } else {
      setMistake(mistake + 1);
    }
    return success;
  };

  const cardOnClick = (turnedCard: any) => {
    let c = cards.slice();
    let updatedCards;

    switch (turnedUpCards().length) {
      // めくられたカードが0or1ならめくる
      case 0:
      case 1:
        updatedCards = c.map((card) => {
          if (card.id === turnedCard.id) {
            return { id: card.id, text: card.text, status: "turnedUp" };
          } else {
            return card;
          }
        });
        break;
      // めくられたカードが2なら判定する
      case 2:
        const success = judge();
        updatedCards = cards.map((card) => {
          if (
            turnedUpCards()
              .map((card) => card.id)
              .includes(card.id)
          ) {
            return {
              id: card.id,
              text: card.text,
              status: success ? "taken" : "turnedDown",
            };
          } else {
            return { id: card.id, text: card.text, status: card.status };
          }
        });
    }

    setCards(updatedCards);
  };

  // カードを描画
  const renderCards = () => {
    return cards.map((card) => {
      return <Card card={card} onClick={() => cardOnClick(card)} />;
    });
  };

  return (
    <div className="Game">
      <GameHeader point={point} mistake={mistake} />
      {renderCards()}
    </div>
  );
};
