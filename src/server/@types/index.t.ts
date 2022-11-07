declare global {
  function roundToDecimalPlaces(num: number, decimalPlaces: number): number;
  function numberInRange(
    num: number,
    min: number,
    max: number,
    inclusive: boolean
  ): boolean;
  function generateJWT(object: any, remember: boolean): string;
  interface Character {
    name: string;
    user: string;
    picture: string;
    age: number;
    gender: string;
    location: string;
    personalityStats: {
      rhetoric: number;
      intelligence: number;
      charisma: number;
      dealmaking: number;
      leadership: number;
    };
  }
}

export {};
