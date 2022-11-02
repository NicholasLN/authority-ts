import express from "express";
import { body, param } from "express-validator";
import characterController from "../../controllers/characterController";
import { isLoggedIn, notLoggedIn } from "../../stategies/authStrategies";

var router = express.Router();

router.post(
  "/create",
  isLoggedIn,
  body("name", "Name is required").exists(),
  characterController.createCharacter
);

router.get(
  '/read/:id',
  param('id', 'ID is required').exists(),
  characterController.getCharacter
)

export default router;
