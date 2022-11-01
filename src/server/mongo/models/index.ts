import { logDB } from "../../utils/logging";

// This file is just a collection of all the models in the project so that the database can be initialized with all of them
require("../models/User");
require("../models/Character");

function main() {
  logDB("Models initialized!", true);
}

export default main;
