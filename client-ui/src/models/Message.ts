import IUser from "./User";

interface IMessage {
  _id: string;
  fromUser: IUser;
  toUser: IUser;
  message: string;
  read: boolean;
  createdAt: string;
}

export default IMessage;
