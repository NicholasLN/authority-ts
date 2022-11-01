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
}

interface Character {
  _id: string;
  name: string;
  user: string;
}
