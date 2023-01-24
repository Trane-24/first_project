import IUser from './User';

interface IConversation {
  _id: string;
  client: Pick<IUser, 'firstName' | 'lastName' | '_id'>;
  message: string;
  read:boolean;
  updatedAt: string;
}

export default IConversation;
