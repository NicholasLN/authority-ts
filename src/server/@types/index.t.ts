declare global {
  function roundToDecimalPlaces(num: number, decimalPlaces: number): number;
  function numberInRange(
    num: number,
    min: number,
    max: number,
    inclusive: boolean
  ): boolean;
  function generateJWT(object: any, remember: boolean): string;
}

export {};
