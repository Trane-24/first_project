import IAsset from "./Asset";

interface IHotelType {
  _id: string;
  name: string;
  description: string;
  image: IAsset;
}

export default IHotelType;
