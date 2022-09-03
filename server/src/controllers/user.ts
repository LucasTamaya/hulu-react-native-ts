import bcrypt from "bcrypt";
import { Request, Response } from "express";

import User from "../models/User";
import { IUser, IChangePassword } from "../interfaces";
import { passwordValidation } from "../helpers/passwordValidation";
import { logUser, registerUser } from "../services/userService";

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { response } = await logUser(email, password);

  return res.json(response);
};

const RegisterController = async (req: Request, res: Response) => {
  const { name, email, password }: IUser = req.body;

  const { response } = await registerUser(name, email, password);

  return res.json(response);
};

const UpdatePasswordController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { currentPassword, newPassword }: IChangePassword = req.body;

  User.findById(userId, async (err: any, user: IUser) => {
    // si il y a une erreur
    if (err) {
      console.log(err.message);
    }

    // test la correspondance des mots de passes
    const isMatch: boolean | undefined = await passwordValidation(
      user.password,
      currentPassword
    );

    // si les mots de passe correspondent pas
    if (!isMatch) {
      console.log("Mot de passe invalide");
      return res.json({ error: true, details: "Mot de passe invalide" });
    }

    // si les mots de passe correspondent
    // hash du nouveau mot de passe
    const hashPassword: string = await bcrypt.hash(newPassword, 10);

    // mise à jour du mot de passe dans la BDD
    await user.updateOne({
      $set: { password: hashPassword },
    });

    return res.json({
      error: false,
      details: "Mot de passe correctement modifié",
    });
  });
};

export { LoginController, RegisterController, UpdatePasswordController };
