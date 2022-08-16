import IUser from "./User";

interface IHotel {
  _id: string;
  name: string;
  country?: string;
  city?: string;
  imgUrl?: string;
  description?: string;
  owner: IUser;
}

export default IHotel;
