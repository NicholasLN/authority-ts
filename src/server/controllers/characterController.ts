import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Region from "../mongo/models/Region";
import User from "../mongo/models/User";
import Character from "../mongo/models/Character";
require("../mongo/models/Region");
import { logError } from "../utils/logging";
import uploadFile from "../utils/uploadFile";

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

    // Populate region
    console.log(req.params.id);
    const character = await Character.findById(req.params.id)
      .populate("region")
      .exec();

    if (character) {
      return res.status(200).json({ ...character.toJSON() });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ errors: [{ msg: "Something went wrong" }] });
  }
}

async function updatePicture(req: Request, res: Response, next: NextFunction) {
  console.log(req.file, req.files, req.body);
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
              var user = await User.findById(req.user.id)
                .populate("characters")
                .select("-password");
              if (user) {
                return res.status(200).json(user);
              }
            }
          }
          return res.status(200).json({ file: newFile });
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
