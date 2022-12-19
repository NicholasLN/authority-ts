import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import User from "../mongo/models/User";
import Region from "../mongo/models/Region";
import { grabUserById } from "../utils/user";

// User Controller with following methods: Register, Login
// Path: src\server\controllers\userController.ts

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var usersWithSameUsername = await User.find({
      username: req.body.username,
    });
    if (usersWithSameUsername.length > 0) {
      return res.status(409).json({
        errors: [
          {
            msg: "Username already exists",
          },
        ],
      });
    }
    // Create user
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await user.save();
    // Check if user was created
    if (user) {
      // If user was created, generate the JWT token to send back to the user
      var jwtObj = {
        id: `${user._id}`,
        role: user.role,
      };
      var jwtToken = global.generateJWT(jwtObj, false);
      // Send the JWT token back to the user as well as the user object
      return res.status(200).json({
        message: "User created",
        token: jwtToken,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    }
    return res.status(500).json({
      message: "User not created",
    });
  } catch (err: any) {
    next(err);
  }
}
async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // Check if user exists
    const user = await User.findOne({ username: req.body.username }).populate({
      path: "characters",
      populate: {
        path: "region",
        model: "Region",
        select: "-borders",
      },
      strictPopulate: false,
    });
    if (user) {
      // If user exists, check if the password is correct
      if (user.verifyPassword(req.body.password)) {
        // If password is correct, generate the JWT token to send back to the user
        var jwtObj = {
          id: `${user._id}`,
          role: user.role,
        };

        var remember = false;
        req.body.remember ? (remember = true) : (remember = false);

        var jwtToken = generateJWT(jwtObj, remember);
        // Send the JWT token back to the user as well as the user object;
        var updatedUser = (await grabUserById(user._id, false, {
          grabCharacters: true,
          grabRegions: {
            grabRegion: true,
            grabBorders: false,
          },
          grabCountries: true,
        })) as any;
        // TODO: Fix this any, IDK why it's not working with the return.
        return res.status(200).json({
          message: "User logged in",
          token: jwtToken,
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
            characters: updatedUser?.characters,
          },
        });
      }
    }
    return res.status(401).json({ errors: [{ msg: "User not found" }] });
  } catch (err: any) {
    next(err);
  }
}
async function profile(req: Request, res: Response, next: NextFunction) {
  // find user and populate characters, populate regions in characters and depopulate password
  const user = await grabUserById(req.user.id, false, {
    grabCharacters: true,
    grabRegions: {
      grabRegion: true,
      grabBorders: false,
    },
    grabCountries: true,
  });
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ errors: [{ msg: "User not found" }] });
}

export default {
  createUser,
  loginUser,
  profile,
};
