import React from "react";
import Card from "./Card";
import GameHeader from "./GameHeader";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    let chars = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        chars.push(String.fromCodePoint("A".charCodeAt() + i));
      }
    }
    for (var i = chars.length - 1; i > 0; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = chars[i];
      chars[i] = chars[r];
      chars[r] = tmp;
    }
    const cards = chars.map((char, index) => {
      return { id: index, text: char, status: "turnedDown" };
    });

    this.state = {
      mistake: 0,
      point: 0,
      cards: cards,
    };
    this.cardOnClick = this.cardOnClick.bind(this);
  }

  turnedUpCards() {
    return this.state.cards.filter((card) => card.status === "turnedUp");
  }

  judge() {
    const success =
      [...new Set(this.turnedUpCards().map((card) => card.text))].length === 1;
    if (success) {
      const updatedPoint = this.state.point + 1;
      this.setState({
        point: updatedPoint,
      });
    } else {
      const updatedMistake = this.state.mistake + 1;
      this.setState({
        mistake: updatedMistake,
      });
    }
    return success;
  }

  cardOnClick(turnedCard) {
    let cards = this.state.cards.slice();
    let updatedCards;

    switch (this.turnedUpCards().length) {
      case 0:
      case 1:
        updatedCards = cards.map((card) => {
          if (card.id === turnedCard.id) {
            return { id: card.id, text: card.text, status: "turnedUp" };
          } else {
            return card;
          }
        });
        break;
      case 2:
        const success = this.judge();
        updatedCards = cards.map((card) => {
          if (
            this.turnedUpCards()
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

    this.setState({
      cards: updatedCards,
    });
  }

  renderCards() {
    return this.state.cards.map((card) => {
      return <Card card={card} onClick={() => this.cardOnClick(card)} />;
    });
  }

  render() {
    return (
      <div className="Game">
        <GameHeader point={this.state.point} mistake={this.state.mistake} />
        {this.renderCards()}
      </div>
    );
  }
}

export default Game;
