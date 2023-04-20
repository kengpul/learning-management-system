import User from "./User";

export interface Chat {
  readonly _id: string;
  members: User[];
  messages: Messages[];
}

export interface Messages {
    readonly _id: string;
  text: string;
  author: string;
  time: Date;
}
