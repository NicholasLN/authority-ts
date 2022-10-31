import jwt from 'jsonwebtoken';

global.roundToDecimalPlaces = (num, decimalPlaces) => {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(num * multiplier) / multiplier;
};

global.numberInRange = (num, min, max, inclusive = false) => {
  var rtn: boolean = false;
  inclusive ? (rtn = num >= min && num <= max) : (rtn = num > min && num < max);
  return rtn;
};

global.generateJWT = (object, remember = false) => {
  var secret: string = process.env.JWT_SECRET!;
  var expiry: string = remember ? "7d" : "1d";
  return jwt.sign(object, secret, { expiresIn: expiry });
};

function initGlobalMethods() {
  // Do nothing
}
export default initGlobalMethods;
