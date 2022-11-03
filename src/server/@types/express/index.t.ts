declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        role: string;
      };
      currentCharacter: Character | null;
    }
  }
}

export {};
