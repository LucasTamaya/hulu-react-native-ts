import { Document } from "mongoose";

interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  savedFilmIds: number[];
}

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export { IUser, IChangePassword };
