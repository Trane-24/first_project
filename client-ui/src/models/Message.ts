import IUser from "./User";

interface IMessage {
  _id: string;
  fromUser: IUser;
<<<<<<< HEAD
  message: string;
  read: boolean;
=======
  toUser: IUser;
  message: string;
  read: boolean;
  createdAt: string;
>>>>>>> 474d7eafdaa64ab7a428c77c19c7e61ce5f44261
}

export default IMessage;
