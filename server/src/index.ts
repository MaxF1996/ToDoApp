import { config } from "dotenv";
config();

import express from "express";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardController } from "./controllers/createCardController";
import { getDeckController } from "./controllers/getDeckController";
import { deleteCardController } from "./controllers/deleteCardController";
import mongoose from "mongoose";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:id", deleteDeckController);

app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardController);
app.delete("/decks/:deckId/cards/:index", deleteCardController);

mongoose.connect(process.env.MONGODB_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
