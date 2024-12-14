import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Game } from "./Game";
import "@testing-library/jest-dom";

// 過去のトライが影響しないことを確認したいのでシナリオテスト的な記述とする
// useGameフックのテストに比べると、 Gameコンポーネントのレンダリング部分やCardコンポーネント, ScoreBoardコンポーネントもテスト対象に含む
test("正解->不正解->正解", () => {
  const { getByText, getAllByTestId } = render(<Game randomize={false} />);

  const point = getByText(/point/i);
  const mistake = getByText(/mistake/i);

  // ================ 初期状態
  expect(point).toHaveTextContent("0");
  expect(mistake).toHaveTextContent("0");

  const cards = getAllByTestId("card");

  // 全部裏向きで表示
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((i) => {
    expect(cards[i].querySelector("img")).toBeInTheDocument();
    expect(cards[i].querySelector("p")).not.toBeInTheDocument();
  });

  // ================ 1トライ目

  // 1枚目をクリックする
  fireEvent.click(cards[0]);

  // 1枚目が表向きの表示である
  expect(cards[0].querySelector("img")).not.toBeInTheDocument();
  expect(cards[0]).toHaveTextContent("A");

  // 2枚目をクリックする
  fireEvent.click(cards[1]);

  // 2枚目が表向きの表示である
  expect(cards[1].querySelector("img")).not.toBeInTheDocument();
  expect(cards[1]).toHaveTextContent("A");

  // クリックする
  fireEvent.click(point);

  // 1,2枚目は非表示
  [0, 1].forEach((i) => {
    expect(cards[i].childElementCount).toBe(0);
  });

  // 3枚目以降は全部裏向きで表示
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((i) => {
    expect(cards[i].querySelector("img")).toBeInTheDocument();
    expect(cards[i].querySelector("p")).not.toBeInTheDocument();
  });

  expect(point).toHaveTextContent("1");
  expect(mistake).toHaveTextContent("0");

  // ================ 2トライ目

  // 3枚目をクリックする
  fireEvent.click(cards[2]);

  // 3枚目が表向きの表示である
  expect(cards[2].querySelector("img")).not.toBeInTheDocument();
  expect(cards[2]).toHaveTextContent("B");

  // 5枚目をクリックする
  fireEvent.click(cards[4]);

  // 5枚目が表向きの表示である
  expect(cards[4].querySelector("img")).not.toBeInTheDocument();
  expect(cards[4]).toHaveTextContent("C");

  // クリックする
  fireEvent.click(point);

  // 1,2枚目は非表示
  [0, 1].forEach((i) => {
    // jsdomではcssは適用されないため、htmlの情報で確認する
    expect(cards[i].childElementCount).toBe(0);
  });

  // 3枚目以降は全部裏向きで表示
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((i) => {
    expect(cards[i].querySelector("img")).toBeInTheDocument();
    expect(cards[i].querySelector("p")).not.toBeInTheDocument();
  });

  expect(point).toHaveTextContent("1");
  expect(mistake).toHaveTextContent("1");

  // ================ 3トライ目

  // 3枚目をクリックする
  fireEvent.click(cards[2]);

  // 3枚目が表向きの表示である
  expect(cards[2].querySelector("img")).not.toBeInTheDocument();
  expect(cards[2]).toHaveTextContent("B");

  // 4枚目をクリックする
  fireEvent.click(cards[3]);

  // 4枚目が表向きの表示である
  expect(cards[3].querySelector("img")).not.toBeInTheDocument();
  expect(cards[3]).toHaveTextContent("B");

  // クリックする
  fireEvent.click(point);

  // 1~4枚目は非表示
  [0, 1, 2, 3].forEach((i) => {
    expect(cards[i].childElementCount).toBe(0);
  });

  // 5枚目以降は全部裏向きで表示
  [4, 5, 6, 7, 8, 9, 10, 11].forEach((i) => {
    expect(cards[i].querySelector("img")).toBeInTheDocument();
    expect(cards[i].querySelector("p")).not.toBeInTheDocument();
  });

  expect(point).toHaveTextContent("2");
  expect(mistake).toHaveTextContent("1");
});
