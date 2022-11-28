import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import multer from "multer";

import jwtMiddleware from "./middlewares/verifyJwt";
import initMongoDBConn from "./mongo/init";

import userRouter from "./routes/user";
import characterRouter from "./routes/character";
import getMapRouter from "./routes/getMap";
import scriptsRouter from "./routes/scripts";
import countryRouter from "./routes/country";

import initGlobalMethods from "./utils/globalMethods";
import { logExpress } from "./utils/logging";
import attachCharacter from "./middlewares/attachCharacter";

console.time("Server startup");
// Initialize global methods
initGlobalMethods();
dotenv.config();

console.timeLog("Server startup", "Loaded .env");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer().single("file"));

console.timeLog("Server startup", "Loaded express");

app.use(jwtMiddleware);
app.use(attachCharacter);
app.use("/api/map", getMapRouter);
app.use("/api/user", userRouter);
app.use("/api/character", characterRouter);
app.use("/api/scripts", scriptsRouter);
app.use("/api/country", countryRouter);
console.timeLog("Server startup", "Loaded routes");

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
