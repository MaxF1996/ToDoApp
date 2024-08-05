import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
  const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
  res.json(deletedDeck);
}
