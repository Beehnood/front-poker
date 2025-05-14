import { Injectable } from '@nestjs/common';
import { Deck } from 'src/tables/entities/deck.entity';
import { Card } from 'src/tables/entities/card.entity';

@Injectable()
export class DeckService {
  generateDeck(): Deck {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];
    const deck = new Deck();

    for (const suit of suits) {
      for (const value of values) {
        deck.cards.push(new Card(value, suit));
      }
    }

    return deck;
  }

  shuffle(deck: Deck): Deck {
    let currentIndex = deck.cards.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      const temp = deck.cards[currentIndex];
      deck.cards[currentIndex] = deck.cards[randomIndex];
      deck.cards[randomIndex] = temp;
    }

    return deck;
  }

  pickCard(deck: Deck): Card | undefined {
    return deck.cards.shift();
  }

  burnCard(deck: Deck): void {
    deck.cards.shift(); // On retire simplement la première carte
  }
}
