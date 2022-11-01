import express from "express";
import { body } from "express-validator";
import characterController from "../../controllers/characterController";
import { isLoggedIn, notLoggedIn } from "../../stategies/authStrategies";

var router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  body("name", "Name is required").exists(),
  characterController.createCharacter
);

export default router;
