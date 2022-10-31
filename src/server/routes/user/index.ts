import express from "express";
import { body } from "express-validator";

import userController from "../../controllers/userController";
import { isLoggedIn, notLoggedIn } from "../../stategies/authStrategies";

var router = express.Router();

/**
 * @route POST api/user/register
 * @desc Register a new user
 * @access Public
 * @returns {Object} User object
 * @returns {String} JWT token
 * @returns {String} Message
 * @returns {Array} Errors
 * @returns {Number} Status code
 */
router.post(
  "/register",
  notLoggedIn,
  body("username", "Username is required")
    .exists()
    .isLength({ min: 1, max: 20 }),
  body("password", "Password is required")
    .exists()
    .isLength({ min: 1, max: 50 }),
  body("email", "Email is required")
    .isEmail()
    .exists()
    .isLength({ min: 1, max: 60 }),
  userController.createUser
);

/**
 * @route POST api/user/login
 * @desc Login a user
 * @access Public
 * @returns {Object} User object
 * @returns {String} JWT token
 * @returns {String} Message
 * @returns {Array} Errors
 * @returns {Number} Status code
 */
router.post(
  "/login",
  notLoggedIn,
  body("username", "Username is required").exists(),
  body("password", "Password is required").exists(),
  userController.loginUser
);

router.get("/profile", isLoggedIn, userController.profile);

export default router;
