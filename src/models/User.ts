import UserRoles from "../types/UserRoles";

interface IUser {
  id: number;
  email: string;
  firstName: string,
  lastName: string;
  phone: string;
  role: UserRoles;
}

export default IUser;
