import express from "express";
import { body, param } from "express-validator";
import characterController from "../../controllers/characterController";
import {
  charBelongsToUser,
  isLoggedIn,
  notLoggedIn,
} from "../../strategies/authStrategies";

var router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  body("name", "Name is required").exists(),
  body("gender", "Gender is required").exists(),
  body("region", "Region is required").exists(),
  body("personalityStats", "Personality Stats are required")
    .exists()
    .isObject(),
  body("personalityStats.rhetoric", "Rhetoric is required")
    .exists()
    .isNumeric(),
  body("personalityStats.intelligence", "Intelligence is required")
    .exists()
    .isNumeric(),
  body("personalityStats.charisma", "Charisma is required")
    .exists()
    .isNumeric(),
  body("personalityStats.dealmaking", "Dealmaking is required")
    .exists()
    .isNumeric(),
  body("personalityStats.leadership", "Leadership is required")
    .exists()
    .isNumeric(),
  characterController.createCharacter
);

router.get(
  "/read/:id",
  param("id", "ID is required").exists(),
  characterController.getCharacter
);

router.post(
  "/updatePicture",
  isLoggedIn,
  charBelongsToUser,
  characterController.updatePicture
);

export default router;
