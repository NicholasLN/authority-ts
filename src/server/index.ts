import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";

import jwtMiddleware from "./middlewares/verifyJwt";
import initMongoDBConn from "./mongo/init";
import userRouter from "./routes/user";
import characterRouter from "./routes/character";
import initGlobalMethods from "./utils/globalMethods";
import { logExpress } from "./utils/logging";
import attachCharacter from "./middlewares/attachCharacter";

// Initialize global methods
initGlobalMethods();
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jwtMiddleware);
app.use(attachCharacter);

// user routes
app.use("/api/user", userRouter);
app.use("/api/character", characterRouter);

app.use(express.static(`${process.env.BUILD_OUTPUT}`));
if (process.env.NODE_ENV!.toUpperCase() == "PRODUCTION") {
  app.get("/*", function (req, res) {
    res.sendFile(
      path.join(__dirname + `../../../${process.env.BUILD_OUTPUT}/index.html`)
    );
  });
}
const server = http.createServer(app);
server.listen(process.env.SERVER_PORT || 8080, () => {
  logExpress(`Server listening on port ${process.env.PORT || 8080}`);
  initMongoDBConn();
});
