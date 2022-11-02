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
    var charactersWithSameName = await Character.find({
      name: req.body.name,
    });
    if (charactersWithSameName.length > 0) {
      return res.status(409).json({
        errors: [
          {
            msg: "Character with this name already exists",
          },
        ],
      });
    }
    // Grab the user from the request
    var user = await User.findById(req.user.id);
    var userChars = user?.characters;
    if (
      userChars &&
      userChars.length + 1 <= parseInt(process.env.MAX_CHARACTERS_PER_PERSON!)
    ) {
      // Create character
      const character = new Character({
        name: req.body.name,
        user: req.user.id,
      });
      await character.save();
      // Check if character was created
      if (character) {
        // If character was created, add it to the user's characters
        user?.characters.push(character._id);
        await user?.save();
        // Send the character back to the user
        return res.status(200).json({
          message: "Character created",
          character,
        });
      }
    } else {
      return res.status(409).json({
        errors: [
          {
            msg: "You have reached the maximum number of characters",
          },
        ],
      });
    }
  } catch (err: any) {
    next(err);
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
