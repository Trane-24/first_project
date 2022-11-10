import IAsset from "./Asset";

export interface IHotelType {
  _id: string;
  name: string;
  description: string;
  image: IAsset;
}