import IAsset from "./Asset";
import IHotelType from "./HotelType";

interface IHotel {
  _id: string;
  name: string;
  country?: string;
  city?: string;
  images: IAsset[];
  description?: string;
  hotelType: IHotelType;
}

export default IHotel;
