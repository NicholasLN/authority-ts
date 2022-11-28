import { logDB } from "../../utils/logging";

import initGovernmentModels from "./government";

// This file is just a collection of all the models in the project so that the database can be initialized with all of them
require("../models/Region");
require("../models/User");
require("../models/Character");
initGovernmentModels();

function main() {
  logDB("Models initialized!", true);
}

export default main;
