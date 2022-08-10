import bcrypt from "bcrypt";

// Fonction afin de comparer des mots de passes
export const passwordValidation = async (
  userPassword: string,
  dbPassword: string | any
): Promise<boolean | undefined> => {
  const matchPasswords = await bcrypt.compare(dbPassword, userPassword);

  console.log(dbPassword);

  if (!matchPasswords) {
    console.log("invalid password");
    return false;
  }

  if (matchPasswords) {
    console.log("valid password");
    return true;
  }
};
