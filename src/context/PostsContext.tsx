import React, { createContext, useReducer, PropsWithChildren } from "react";
import Post from "../models/Post";
import { Request } from "../models/Post";

interface State {
  posts: Post[] | null;
  dispatch?: (action: Action) => void;
}

type Action =
  | { type: Request.GET_POSTS; payload: Post[] }
  | { type: Request.CREATE_POST; payload: Post }
  | { type: Request.EDIT_POST; payload: Post }
  | { type: Request.DELETE_POST; payload: Post };

export const PostsContext = createContext<State>({
  posts: null,
});

export const postsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Request.GET_POSTS:
      return { posts: action.payload };
    case Request.CREATE_POST:
      return { posts: [action.payload, ...state.posts!] };
    case Request.EDIT_POST:
      return {
        posts: state.posts!.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case Request.DELETE_POST:
      return {
        posts: state.posts!.filter((post) => post._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null,
  });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
