import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../mongo/models/User';
import { logError } from '../utils/logging';

interface JwtPayload {
  id: string;
  role: string;
}
async function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  // By default, we have a basic user in the request
  req.user = {
    id: "false",
    role: "user",
  };
  // If the request has a token, we try to decode it
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token == "null") {
      return next();
    }
    try {
      var secret: string = process.env.JWT_SECRET!;
      if (!secret) {
        logError("JWT_SECRET not set in environment variables. Make it so!");
        process.exit(1);
      }
      // decode the token
      var decoded = jwt.verify(token, secret);
      // if the token is valid
      if (decoded) {
        var id = (decoded as JwtPayload).id;
        var userFound = await User.findById(id);
        // if the user exists
        if (userFound) {
          req.user = {
            id: `${userFound._id}`,
            role: userFound.role,
          };
          return next();
        }
      }
    } catch (err: any) {
      logError(err);
      return next();
    }
  }
  // If the request by this point has no user, we return an error
  next();
}

export default jwtMiddleware;
