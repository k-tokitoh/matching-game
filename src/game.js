import React from 'react';
import Card from './card';
import GameHeader from './game_header';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      point: 0,
      cards:[
        { id: 0,  text: 'B', status: 'turnedDown' },
        { id: 1,  text: 'D', status: 'turnedDown' },
        { id: 2,  text: 'F', status: 'turnedDown' },
        { id: 3,  text: 'F', status: 'turnedDown' },
        { id: 4,  text: 'A', status: 'turnedDown' },
        { id: 5,  text: 'D', status: 'turnedDown' },
        { id: 6,  text: 'C', status: 'turnedDown' },
        { id: 7,  text: 'B', status: 'turnedDown' },
        { id: 8,  text: 'E', status: 'turnedDown' },
        { id: 9,  text: 'A', status: 'turnedDown' },
        { id: 10, text: 'C', status: 'turnedDown' },
        { id: 11, text: 'E', status: 'turnedDown' },
      ]
    };
    this.cardOnClick = this.cardOnClick.bind(this);
  }

  turnedUpCards() {
    return this.state.cards.filter(card => card.status === 'turnedUp' )
  };

  judge() {
    const success = [...new Set(this.turnedUpCards().map(card => card.text))].length === 1
    if (success) {
      const updatedPoint = this.state.point + 1
      this.setState({
        point: updatedPoint
      })
    } else {
      const updatedMistake = this.state.mistake + 1
      this.setState({
        mistake: updatedMistake
      })
    }
    return success;
  }

  cardOnClick(turnedCard) {
    let cards = this.state.cards.slice()
    let updatedCards;

    switch(this.turnedUpCards().length) {
      case 0:
      case 1:
        updatedCards = cards.map(card => {
          if (card.id === turnedCard.id) {
            return { id: card.id,  text: card.text, status: 'turnedUp' }
          } else {
            return card
          }
        });
        break;
      case 2:
        const success = this.judge();
        updatedCards = cards.map(card => {
          if (this.turnedUpCards().map(card => card.id).includes(card.id)) {
            return { id: card.id,  text: card.text, status: (success ? 'taken' : 'turnedDown') }
          } else {
            return { id: card.id,  text: card.text, status: card.status }
          }
        });
    }

    this.setState({
      cards: updatedCards
    });
  }

  renderCards() {
    return this.state.cards.map(card => {
      return (
        <Card card={card} onClick={() => this.cardOnClick(card)} />
      )
    })
  };

  render() {
    return(
      <div className="Game">
        <GameHeader point={this.state.point} mistake={this.state.mistake}/>
        {this.renderCards()}
      </div>
    )
  }
}

export default Game;
