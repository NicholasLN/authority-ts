import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Character from "../mongo/models/Character";
import User from "../mongo/models/User";

// Character Controller with following methods: Create, Read, Update, Delete
// Path: src\server\controllers\characterController.ts

async function createCharacter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, gender, location, personalityStats } = req.body;
    const sumValues = (obj: object) =>
      Object.values(obj).reduce((a, b) => a + b, 0);
    if (sumValues(personalityStats) == 50) {
      const user = await User.findById(req.user.id);
      if (user) {
        const newChar = new Character({
          name,
          user: req.user.id,
          age: 18,
          gender,
          location,
          personalityStats,
        });
        // Push the new character to the user's character array
        await newChar.save();
        user.characters.push(newChar._id);
        await user.save();

        return res
          .status(200)
          .json({ characters: user.characters, character: newChar.toJSON() });
      }
    } else {
      return res
        .status(422)
        .json({ errors: [{ msg: "Personality Stats must add up to 50" }] });
    }
  } catch (e) {
    return next(e);
  }
}

async function getCharacter(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const character = await Character.findById(req.params.id);

    if (character) {
      return res.status(200).json({ ...character.toJSON() });
    }
  } catch (e) {
    return res.status(500).json({ errors: [{ msg: "Something went wrong" }] });
  }
}

export default {
  createCharacter,
  getCharacter,
};
