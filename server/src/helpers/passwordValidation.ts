import bcrypt from "bcrypt";

// Fonction afin de comparer des mots de passes
export const passwordValidation = async (
  userPassword: string,
  dbPassword: string
): Promise<boolean | undefined> => {
  const matchPasswords: boolean = await bcrypt.compare(
    dbPassword,
    userPassword
  );

  console.log(dbPassword);

  if (!matchPasswords) {
    console.log("mot de passe invalide");
    return false;
  }

  if (matchPasswords) {
    console.log("mot de passe valide");
    return true;
  }
};
