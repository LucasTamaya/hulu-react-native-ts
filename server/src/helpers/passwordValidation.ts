import bcrypt from "bcrypt";

export const passwordValidation = async (
  userPassword: string,
  dbPassword: string
): Promise<boolean | undefined> => {
  const matchPasswords: boolean = await bcrypt.compare(
    dbPassword,
    userPassword
  );

  // si mot de passe invalide
  if (!matchPasswords) {
    console.log("mot de passe invalide");
    return false;
  }

  // si mot de passe valide
  console.log("mot de passe valide");
  return true;
};
