import User from "./User";
import Room from "./Room";

export default interface Post {
  readonly _id: string;
  content: string;
  likes: User[];
  comments: Comment[];
  author: User;
  room: Room;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  readonly _id: string;
  username: string;
  content: string;
  date: string;
}

export enum Request {
  GET_POSTS = "GET_POSTS",
  CREATE_POST = "CREATE_POST",
  EDIT_POST = "EDIT_POST",
  DELETE_POST = "DELETE_POST",
}

export type ActionType =
  | Request.GET_POSTS
  | Request.CREATE_POST
  | Request.EDIT_POST
  | Request.DELETE_POST;
