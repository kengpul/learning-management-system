import Room from "./Room";

export default interface User {
  readonly _id: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  avatar: {
    fileName: string;
    path: string;
  };
  type: AccountType;
  rooms: Room[];
}

export interface Chat {
  readonly _id: string;
  members: [string, string];
  messages: {
    readonly _id: string;
    text: string;
    author: string;
    time: Date;
  }[];
}

export enum Account {
  Student = "Student",
  Teacher = "Teacher",
}

export type AccountType = Account.Teacher | Account.Student;
