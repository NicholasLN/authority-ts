import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Region from "../mongo/models/Region";
import User from "../mongo/models/User";
import Character from "../mongo/models/Character";
require("../mongo/models/Region");
import { logError } from "../utils/logging";
import uploadFile from "../utils/uploadFile";

import { grabCharacterById, grabCharactersById } from "../utils/character";
import { grabUserById } from "../utils/user";

// Character Controller with following methods: Create, Read, Update, Delete
// Path: src\server\controllers\characterController.ts

/**
 * Create a new character
 * FIELDS REQUIRED: name, gender, region, personality stats (all 5 must add up to 50)
 */
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
    const { name, gender, region, personalityStats } = req.body;
    const regionFound = await Region.findOne({ _id: region });
    if (!regionFound) {
      return res.status(404).json({
        errors: [
          {
            msg: "Location not found",
          },
        ],
      });
    }
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
          region: regionFound._id,
          personalityStats,
        });
        // Push the new character to the user's character array
        await newChar.save();
        user.characters.push(newChar._id);
        await user.populate("characters");
        await user.save();

        const newCharacters = await grabCharactersById(user._id);
        if (newCharacters) {
          return res.status(200).json({
            characters: newCharacters,
            character: newChar._id,
          });
        } else {
          return res.status(500).json({
            errors: [{ msg: "Something went wrong" }],
          });
        }
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
    const character = await grabCharacterById(
      req.params.id,
      { includeRegion: true, includeBorders: false },
      true
    );
    if (character) {
      return res.status(200).json(character);
    }
  } catch (e) {
    return res.status(500).json({ errors: [{ msg: "Something went wrong" }] });
  }
}

async function updatePicture(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    if (req.file) {
      if (req.currentCharacter) {
        // GET FILE TYPE
        const fileType = req.file.mimetype.split("/")[1];
        if (
          fileType == "jpeg" ||
          fileType == "png" ||
          fileType == "jpg" ||
          fileType == "gif"
        ) {
          var newFile = await uploadFile(
            req.file,
            `characters/${req.currentCharacter._id}.${fileType}`
          );
          if (newFile.Location) {
            var character = await Character.findById(req.currentCharacter._id);
            if (character) {
              character.picture = newFile.Location;
              await character.save();
              var user = await grabUserById(req.user.id, false);
              if (user) {
                return res.status(200).json(user);
              }
            }
          }
        } else {
          return res.status(422).json({
            errors: [{ msg: "File type not supported" }],
          });
        }
        return res.status(422).json({
          errors: [{ msg: "File type must be jpeg, png, jpg, or gif" }],
        });
      }
    }
  } catch (e) {
    logError(e as any);
    return res.status(500).json({ errors: [{ msg: "Something went wrong" }] });
  }

  return res
    .status(500)
    .json({ errors: [{ msg: "?This is so fucking annoying" }] });
}

export default {
  createCharacter,
  getCharacter,
  updatePicture,
};
