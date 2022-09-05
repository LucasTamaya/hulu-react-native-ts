import { updatePassword } from "./../services/userService";
import { Request, Response } from "express";

import { IUser, IChangePassword } from "../interfaces";
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

  const { response } = await updatePassword(
    userId,
    currentPassword,
    newPassword
  );

  return res.json(response);
};

export { LoginController, RegisterController, UpdatePasswordController };
