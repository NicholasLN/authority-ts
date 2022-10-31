import mongoose from 'mongoose';

import { logDB, logError } from '../utils/logging';
import main from './models';

function grabModels() {
  main();
}

/**
 * Initializes the MongoDB connection.
 */
function initMongoDBConn() {
  if (!process.env.MONGODB_URI_CONNECTION_STRING) {
    logError(
      "MONGODB_URI_CONNECTION_STRING not set in environment variables. Unforunately, the server cannot start without this variable. Bye!"
    );
    process.exit(1);
  }
  logDB("Connecting to MongoDB...", true);
  mongoose.connect(
    `${process.env.MONGODB_URI_CONNECTION_STRING}/${process.env.MONGODB_DB_NAME}`,
    {},
    (err) => {
      if (err) {
        logError("Failed to connect to MongoDB. Bye!");
        process.exit(1);
      }
      logDB("Connected to MongoDB!", true);
    }
  );
  mongoose.Promise = global.Promise;
  grabModels();
}

export default initMongoDBConn;
