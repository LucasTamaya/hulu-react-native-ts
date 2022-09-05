import { ISearchUser } from "../interfaces";
import User from "../models/User";

export const searchUserByEmail = async (
  email: string
): Promise<ISearchUser> => {
  const user = await User.find({ email });

  // si l'utilisateur n'existe pas
  if (user.length === 0) {
    console.log("email invalide");
    return { existingUser: false };
  } else {
    console.log("email valide");
    return { existingUser: true, user };
  }
};
