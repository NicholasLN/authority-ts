interface RootState {
  auth: {
    user: {
      username: string;
      password: string;
      email: string;
      role: string;
      characters: Array<Character>;
    };
    loggedIn: boolean;
  };
  windowFocus: {
    focus: boolean;
  };
  ui: {
    hideSidebar: boolean;
  };
  character: {
    currentCharacter: Character;
    characters: Array<Character>;
  };
  element: {
    element: string;
    contentId: string;
    characterId: string;
  }
}

interface Character {
  _id: string;
  name: string;
  user: string;
  gender: string;
  location: string;
  personalityStats: {
    rhetoric: number;
    intelligence: number;
    charisma: number;
    dealmaking: number;
    leadership: number;
  }
}
