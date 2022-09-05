import { Document } from "mongoose";

interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  savedMovieIds: number[];
}

interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

interface ISearchUser {
  existingUser: boolean;
  user?: any;
}

export { IUser, IChangePassword, ISearchUser };
