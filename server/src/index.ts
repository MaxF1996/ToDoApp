import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 5000;
const app = express();

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://max_f96:5MUq52jzfdTeXXYC@maxf96.eisceua.mongodb.net/DeckAppDB?retryWrites=true&w=majority&appName=MAXF96"
  )
  .then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
  });
