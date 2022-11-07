// authStrategies.ts
import { NextFunction, Request, Response } from "express";

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user.id !== "false") {
    next();
  } else {
    res.status(401).send("You are not logged in.");
  }
}

function notLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.user.id === "false") {
    next();
  } else {
    res.status(401).send("You are already logged in.");
  }
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(401).send("You do not have administrator privileges.");
  }
}

function charBelongsToUser(req: Request, res: Response, next: NextFunction) {
  if (req.currentCharacter) {
    if (req.currentCharacter.user == req.user.id) {
      next();
    } else {
      res.status(401).send("You do not own this character.");
    }
  } else {
    res.status(401).send("You do not own this character.");
  }
}

export { isLoggedIn, notLoggedIn, isAdmin, charBelongsToUser };
