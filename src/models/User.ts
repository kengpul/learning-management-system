import Room from "./Room";

export default interface User {
  readonly _id: string;
  username: string;
  password: string;
  email: string;
  type: AccountType;
  rooms: Room[];
}

export enum Account {
  Student = "Student",
  Teacher = "Teacher",
}

export type AccountType = Account.Teacher | Account.Student;
