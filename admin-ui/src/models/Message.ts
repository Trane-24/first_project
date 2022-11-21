import IUser from "./User";

interface IMessage {
  _id: string;
  fromUser: IUser;
  message: string;
  read: boolean;
}

export default IMessage;
