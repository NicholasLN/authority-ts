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
    characters: Character[];
  };
  contextMenu: {
    contextType: string;
    contextId: string;
  };
}

interface Character {
  _id: string;
  name: string;
  age: number;
  user: string;
  gender: string;
  location: string;
  personalityStats: PersonalityStats;
}

interface PersonalityStats {
  rhetoric: number;
  intelligence: number;
  charisma: number;
  dealmaking: number;
  leadership: number;
}
