import IUser from "./User";

interface IMessage {
  _id: string;
  fromUser: Pick<IUser, 'firstName' | 'lastName' | '_id'>;
  toUser: Pick<IUser, 'firstName' | 'lastName' | '_id'>;
  message: string;
  read: boolean;
  createdAt: string;
}

export default IMessage;
