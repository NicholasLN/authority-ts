import chalk from "chalk";

function log(message: string, addTimeStamp: boolean = false) {
  var str = chalk`${message}`;
  if (addTimeStamp) {
    var time = new Date().toLocaleTimeString();
    str += chalk` {rgb(128,128,128).bold [${time}]}`;
  }
  return str;
}

/**
 * Logs a message about the DB to the console.
 * @param message The message to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logDB(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{green.bold [DB]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}

/**
 * Logs a message about the game to the console.
 * @param message The message to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logGame(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{blue.bold [GAME]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}

/**
 * Logs an error message to the console.
 * @param message The error to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logError(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{red.bold [ERROR]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}

/**
 * Logs a success message to the console.
 * @param message The success message to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logSuccess(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{green.bold [SUCCESS]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}

/**
 * Logs a success message to the console.
 * @param message The success message to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logWorld(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{rgb(86,125,70).bold [WORLD]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}


/**
 * Logs an EXPRESS message to the console.
 *
 * @param message The message to log.
 * @param addTimeStamp Whether to add a timestamp to the message.
 */
function logExpress(message: string, addTimeStamp: boolean = false) {
  let str = chalk`{rgb(255,255,255).bold.bgBlack [EXPRESS]} {white ${message}}`;
  console.log(chalk`${log(str, addTimeStamp)}`);
}

export { logDB, logGame, logError, logSuccess, logWorld, logExpress };
