import IHotel from "./Hotel";
import IUser from "./User";

interface IReservation {
  id: number;
  startDate: string;
  endDate: string,
  hotel: IHotel;
  guest: IUser;
}

export default IReservation;
