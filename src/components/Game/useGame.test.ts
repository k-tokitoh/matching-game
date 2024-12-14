import { act, renderHook } from "@testing-library/react";
import { describe, expect } from "vitest";
import { useGame } from "./useGame";

describe("useGame フック", () => {
  describe("初期状態", () => {
    const { result } = renderHook(() => useGame({ randomize: false }));
    test("正解数が0", () => {
      expect(result.current.point).toBe(0);
    });
    test("不正解数が0", () => {
      expect(result.current.mistake).toBe(0);
    });
    test("カードがAABBCCDDEEFFで全部裏", () => {
      expect(result.current.cards).toEqual([
        { id: 0, text: "A", status: "down" },
        { id: 1, text: "A", status: "down" },
        { id: 2, text: "B", status: "down" },
        { id: 3, text: "B", status: "down" },
        { id: 4, text: "C", status: "down" },
        { id: 5, text: "C", status: "down" },
        { id: 6, text: "D", status: "down" },
        { id: 7, text: "D", status: "down" },
        { id: 8, text: "E", status: "down" },
        { id: 9, text: "E", status: "down" },
        { id: 10, text: "F", status: "down" },
        { id: 11, text: "F", status: "down" },
      ]);
    });
  });

  describe("1枚カードをめくる", () => {
    const { result } = renderHook(() => useGame({ randomize: false }));

    act(() => {
      result.current.onCardClick(result.current.cards[0]);
    });

    test("1枚目のカードが表になる", () => {
      expect(result.current.cards[0].status).toBe("up");
    });
    test("2枚目のカードは裏のまま", () => {
      expect(result.current.cards[1].status).toBe("down");
    });
    test("正解数が0", () => {
      expect(result.current.point).toBe(0);
    });
    test("不正解数が0", () => {
      expect(result.current.mistake).toBe(0);
    });
  });

  describe("同じ文字のカード2枚をめくる", () => {
    const { result } = renderHook(() => useGame({ randomize: false }));

    act(() => {
      result.current.onCardClick(result.current.cards[0]);
    });
    act(() => {
      result.current.onCardClick(result.current.cards[1]);
    });
    act(() => {
      result.current.onClick();
    });

    test("1枚目のカードがとられている", () => {
      expect(result.current.cards[0].status).toBe("taken");
    });
    test("2枚目のカードがとられている", () => {
      expect(result.current.cards[1].status).toBe("taken");
    });
    test("3枚目のカードは裏のまま", () => {
      expect(result.current.cards[2].status).toBe("down");
    });
    test("正解数が1", () => {
      expect(result.current.point).toBe(1);
    });
    test("不正解数が0", () => {
      expect(result.current.mistake).toBe(0);
    });
  });

  describe("異なる文字のカード2枚をめくる", () => {
    const { result } = renderHook(() => useGame({ randomize: false }));

    act(() => {
      result.current.onCardClick(result.current.cards[0]);
    });
    act(() => {
      result.current.onCardClick(result.current.cards[2]);
    });
    act(() => {
      result.current.onClick();
    });

    test("1枚目のカードが裏のまま", () => {
      expect(result.current.cards[0].status).toBe("down");
    });
    test("3枚目のカードも裏のまま", () => {
      expect(result.current.cards[2].status).toBe("down");
    });
    test("正解数が0", () => {
      expect(result.current.point).toBe(0);
    });
    test("不正解数が1", () => {
      expect(result.current.mistake).toBe(1);
    });
  });
});
