import bcrypt from "bcrypt";

import { passwordValidation } from "../helpers/passwordValidation";

const mockPassword = "aSuperStrongPassword";

describe("Password validation helper function", () => {
  it("should return true if the passwords match", async () => {
    // mock de la fonction 'compare' car elle fournira toujours un mot de passe hashé différent
    jest.spyOn(bcrypt, "compare").mockImplementation(() => true);

    const userPassword: string = mockPassword;
    const dbPassword: string = mockPassword;
    const isValid = await passwordValidation(userPassword, dbPassword);

    expect(isValid).toBe(true);
  });

  it("should return false if the passwords doesn't match", async () => {
    jest.spyOn(bcrypt, "compare").mockImplementation(() => false);

    const userPassword: string = "aWrongPassword";
    const dbPassword: string = mockPassword;
    const isValid = await passwordValidation(userPassword, dbPassword);

    expect(isValid).toBe(false);
  });
});
