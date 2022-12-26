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
  alerts: {
    alerts: Alert[];
  };
}

interface Character {
  _id: string;
  name: string;
  picture: string;
  age: number;
  user: string;
  gender: string;
  region: {
    name: string;
    _id: string;
  };
  country: Country;
  personalityStats: PersonalityStats;
}

interface Country {
  _id: string;
  legislativeBranch: string;
  name: string;
  regions: Array<string> | Array<Region>;
  color: string;
}

interface Region {
  name: string;
  borders?: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface PersonalityStats {
  rhetoric: number;
  intelligence: number;
  charisma: number;
  dealmaking: number;
  leadership: number;
}

type Alert = {
  type: string;
  message: string;
  timeout: number;
  id: number;
};
