import React from "react";
import Cookies from "js-cookie";
import getPage from "../utils/getPage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, updateState } from "../redux/reducers/authSlice";
import { BeatLoader } from "react-spinners";
import {
  characterLogout,
  updateCharacters,
} from "../redux/reducers/characterSlice";

type UserSessionHandlerProps = {
  children: JSX.Element | JSX.Element[] | null;
};

function userSessionHandler(props: UserSessionHandlerProps) {
  const [loading, setLoading] = React.useState(true);
  const userState = useSelector((state: RootState) => state.auth);
  const isFocused = useSelector((state: RootState) => state.windowFocus.focus);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function updateSession(): Promise<any> {
      var access_token: string | undefined = Cookies.get("access_token");
      if (!access_token) {
        // No access token, so we're not logged in
        return Cookies.set("access_token", "null");
      }
      // If the user is focused on the window, we'll update the session. Otherwise, we'll wait until they are.
      // This is to prevent unnecessary requests to the server. Also, it'll refresh the state immediately once they come back.
      if (isFocused) {
        // If the user has an access token, we'll check/update the session (if it's valid and not expired/malformed)
        if (access_token != "null") {
          var response = await getPage("/api/user/profile", true, true);
          if (response.status === 200 || response.status === 304) {
            // If the response is 200, we'll update the state with the new session
            if (!userState.loggedIn) {
              dispatch(login(response.data));
            }
            // Otherwise, if they already have an active state, we'll update it to reflect the users new information
            dispatch(updateState(response.data));
            // Update characters as well
            dispatch(updateCharacters(response.data.characters));
          } else {
            // If the response is not 200, we'll log the user out
            dispatch(logout());
            dispatch(characterLogout());
          }
        }
      }
      setLoading(false);
    }
    updateSession();
    // Set a timer to update the session every 10 seconds
    const interval = setInterval(() => {
      updateSession();
    }, 10000);
    return () => clearInterval(interval);
  }, [isFocused]);

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-2xl">AUTHORITY do be loading tho..</h1>
        <BeatLoader size={10} />
      </div>
    );
  } else {
    return <>{props.children}</>;
  }
}

export default userSessionHandler;
