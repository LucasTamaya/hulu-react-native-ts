require("dotenv").config();

import { mdbConnexion } from "./config/mdbConnexion";
import { createServer } from "./app";

const PORT: string | number = process.env.PORT || 4000;

const app = createServer();

app.listen(PORT, () => {
  mdbConnexion();
  console.log("server now running on port", PORT);
});

export default app;
