import IUser from "./User";

interface IConversation {
  _id: string;
  client: IUser;
  message: string;
  read: boolean;
}

export default IConversation;
