import React, { useEffect, useState } from "react";
import { createDeck } from "./api/createDeck";
import { getDecks, TDeck } from "./api/getDecks";
import { deleteDeck } from "./api/deleteDeck";
import "./App.css";

export default function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newDeck = await createDeck(title);
    setDecks([...decks, newDeck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  return (
    <div className="App">
      <h1>To Do App</h1>
      <ul className="Decks" id="Decks">
        {decks.map((deck: any) => (
          <li key={deck._id}>
            <button
              className="DeleteButton"
              onClick={() => handleDeleteDeck(deck._id)}
            >
              X
            </button>
            {deck.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck} id="DeckForm" className="DeckForm">
        <label htmlFor="DeckTitle">Deck Title:</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
          type="text"
          name="title"
          id="DeckTitle"
          placeholder="Enter Deck Title"
          required
        />
        <button className="SubmitButton" type="submit">
          Create Deck
        </button>
      </form>
    </div>
  );
}
