import ReservationStatuses from "../types/ReservationStatuses";
import IHotel from "./Hotel";
import IUser from "./User";

interface IReservation {
  _id: string;
  startDate: string;
  endDate: string,
  notes: string,
  status: ReservationStatuses;
  hotel: IHotel;
  guest: IUser;
}

export default IReservation;
