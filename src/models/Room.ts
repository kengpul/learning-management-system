import Post from "./Post";
import User from "./User";  

export default interface Room {
  readonly _id: string;
  name: string;
  code: string;
  chat: string;
  post: Post[];
  teachers: User[];
  students: User[];
  pending: User[];
  link: {
    attendance: string;
    meeting: string;
  };
}
