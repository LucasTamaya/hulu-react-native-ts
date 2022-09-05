import { IUser } from "../interfaces";
import User from "../models/User";

export const searchUserById = async (userId: string) => {
  const user: IUser | null = await User.findById(userId);

  return user;
};
