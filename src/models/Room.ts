import Post from "./Post";
import User from "./User";

export default interface Room {
  readonly _id: string;
  name: string;
  code: string;
  post: Post[];
  teachers: User[];
  students: User[];
  pending: User[];
  link: {
    attendance: string;
    meeting: string;
  };
  messages: Messages[];
}

export interface Messages {
  readonly _id: string;
  text: string;
  author: string;
  time: Date;
}
