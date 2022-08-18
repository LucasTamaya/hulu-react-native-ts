import mongoose from "mongoose";

// Connexion à MongoDB
export const mdbConnexion = (): void => {
  mongoose.connect(process.env.MONGODB_URI + "&w=majority");
  mongoose.connection.once("open", () => console.log("MONGODB connected"));
};
