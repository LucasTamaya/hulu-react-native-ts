import { Schema, model, models } from "mongoose";

import { IUser } from "../interfaces";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  savedMovieIds: { type: [Number], required: true },
});

export default models.User || model<IUser>("User", UserSchema);
