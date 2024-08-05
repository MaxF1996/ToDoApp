import React, { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

export default function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  return (
    <div className="App">
      <h1>To Do App</h1>
      <ul className="Decks" id="Decks">
        {decks.map((deck: any) => (
          <li key={deck._id}>{deck.title}</li>
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
