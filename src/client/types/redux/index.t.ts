interface RootState {
  auth: {
    user: any;
    loggedIn: boolean;
  };
  windowFocus: {
    focus: boolean;
  };
  ui: {
    hideSidebar: boolean;
  };
}
