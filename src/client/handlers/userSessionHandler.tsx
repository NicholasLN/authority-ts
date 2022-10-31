import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { login, logout, updateState } from "../redux/reducers/authSlice";
import getPage from "../utils/getPage";
import { BeatLoader } from "react-spinners";

type UserSessionHandlerProps = {
  children: JSX.Element;
};

function userSessionHandler(props: UserSessionHandlerProps) {
  const [loading, setLoading] = React.useState(true);
  const userState = useSelector((state: RootState) => state.auth);
  const isFocused = useSelector((state: RootState) => state.windowFocus.focus);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function updateSession(): Promise<any> {
      var access_token = Cookies.get("access_token");
      if (!access_token) {
        return Cookies.set("access_token", "null");
      }
      if (isFocused) {
        try {
          var resp = await getPage("/api/user/profile", access_token);
          if (resp.data) {
            if (!userState.loggedIn) {
              dispatch(login(resp.data));
            }
            dispatch(updateState(resp.data));
          }
        } catch (e: any) {
          Cookies.set("access_token", "null");
          dispatch(logout());
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
