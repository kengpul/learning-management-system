import React, {
  createContext,
  useEffect,
  useReducer,
  PropsWithChildren,
} from "react";
import jwtDecode from "jwt-decode";

interface User {
  fullname: string;
  username: string;
  token: string;
  type: string;
  avatar: string;
}

interface JWTDecode {
  user: string;
  ati: number;
  exp: number;
}

interface State {
  user: User | null;
  authReady: boolean;
  dispatch?: (type: ActionType) => void;
}

export const AuthContext = createContext<State | undefined>({
  user: null,
  authReady: false,
});

type ActionType =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT"; payload: null }
  | { type: "AUTH_READY"; payload: User };

export const authReducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, authReady: true };
    case "LOGOUT":
      return { user: null, authReady: true };
    case "AUTH_READY":
      return { user: action.payload, authReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authReady: false,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      const decode = jwtDecode(user.token) as JWTDecode;
      if (decode.exp < Date.now() / 1000) {
        return localStorage.clear();
      }
      dispatch({ type: "LOGIN", payload: user });
    }
    dispatch({ type: "AUTH_READY", payload: user });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
