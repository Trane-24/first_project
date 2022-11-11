import IAsset from "./Asset";
import IHotelType from "./HotelType";
import IUser from "./User";

interface IHotel {
  _id: string;
  name: string;
  country?: string;
  city?: string;
  images: IAsset[];
  description?: string;
  owner: IUser;
  hotelType: IHotelType;
}

export default IHotel;
