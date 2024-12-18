import * as React from "react";

import { CardData } from "../Card/Card";

type Card = CardData & {
  readonly id: number;
};

export const useGame = ({ randomize }: { randomize: boolean }) => {
  const [cards, seCards] = React.useState<ReadonlyArray<Card>>(
    iniCards({ randomize })
  );
  const [point, setPoint] = React.useState<number>(0);
  const [mistake, setMistake] = React.useState<number>(0);

  const upCards: ReadonlyArray<Card> = cards.filter(
    ({ status }) => status === "up"
  );
  const canFlip: boolean = upCards.length < 2;

  const paired: boolean =
    // 2枚めくられていて
    upCards.length === 2 &&
    // めくられたカードが同じ文字
    upCards.reduce((acc, card) => acc.add(card.text), new Set<string>())
      .size === 1;

  const onCardClick = (target: Card) => {
    if (canFlip) {
      // めくれる場合は、クリックされたカードを表にする
      seCards(
        cards.map((card) =>
          card.id === target.id ? { ...card, status: "up" } : card
        )
      );
    }
  };

  const onClick = () => {
    // まだめくれる場合は何もしない
    if (canFlip) return;

    // それ以上めくれない場合は判定する
    if (paired) {
      setPoint((point) => point + 1);
      // 表になっているカードを取り除く
      seCards((cards) =>
        cards.map((card) => {
          const nextStatus = card.status === "up" ? "taken" : card.status;
          return { ...card, status: nextStatus };
        })
      );
    } else {
      setMistake((mistake) => mistake + 1);
      // 全部裏にする
      seCards((cards) =>
        cards.map((card) => {
          const nextStatus = card.status === "up" ? "down" : card.status;
          return { ...card, status: nextStatus };
        })
      );
    }
  };

  return {
    point,
    mistake,
    cards,
    onCardClick,
    onClick,
  };
};

const iniCards = ({
  randomize,
}: {
  randomize: boolean;
}): ReadonlyArray<Card> => {
  // AからFまでを2つずつ
  const chars = Array.from({ length: 6 }).flatMap((_, i) =>
    new Array(2).fill(String.fromCodePoint("A".charCodeAt(0) + i))
  );

  if (randomize) {
    // ランダムに並び替え
    for (var i = chars.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = chars[i];
      chars[i] = chars[r];
      chars[r] = tmp;
    }
  }

  return chars.map((char, index) => ({
    id: index,
    text: char,
    status: "down",
  }));
};
