import IUser from "./User";

export default interface Quiz {
  _id: string;
  title: string;
  due: string;
  quizzes: Array<{
    question: string;
    choices: Array<{ answer: string; isCorrect: boolean }>;
  }>;
  author: IUser;
}
