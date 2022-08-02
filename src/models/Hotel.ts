import IUser from "./User";

interface IHotel {
  id: number;
  name: string;
  country: string,
  city: string;
  owner: IUser;
}

export default IHotel;
