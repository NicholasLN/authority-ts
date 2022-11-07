import { Request, Response, NextFunction } from "express";

import Character from "../mongo/models/Character";

async function attachCharacter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.headers.current_character &&
    req.headers.current_character != "none"
  ) {
    const character: any = await Character.findById(
      req.headers.current_character
    );
    if (character) {
      req.currentCharacter = character;
      //console.log("Character attached to request", req.currentCharacter);
    }
  } else {
    req.currentCharacter = null;
  }
  next();
}

export default attachCharacter;
