import IAsset from "./Asset";
import IUser from "./User";

interface IHotel {
  _id: string;
  name: string;
  country?: string;
  city?: string;
  images: IAsset[];
  description?: string;
  owner: IUser;
}

export default IHotel;
