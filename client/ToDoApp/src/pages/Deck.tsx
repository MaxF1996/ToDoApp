import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard } from "../api/createCard";
import { getDeck } from "../api/getDeck";
import { deleteCard } from "../api/deleteCard";
import { TDeck } from "../api/getDecks";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }

    fetchDeck();
  }, [deckId]);

  return (
    <div className="Deck">
      <h2>{deck?.title}</h2>
      <ul className="CardsList" id="CardsList">
        {cards.map((card: any, index: number) => (
          <li key={index}>
            <button
              className="DeleteButton"
              onClick={() => handleDeleteCard(index)}
            >
              X
            </button>
            <div>{card}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateCard} id="CardForm" className="CardForm">
        <label htmlFor="CardText">Card Text:</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          value={text}
          type="text"
          className="CardText"
          name="text"
          id="CardText"
          placeholder="Enter Card Text"
          required
        />
        <button className="SubmitButton" type="submit">
          Create Card
        </button>
      </form>
    </div>
  );
}
