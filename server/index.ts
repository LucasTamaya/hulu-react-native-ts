require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mongoDbConnection = require("./src/config/mdbConnexion");
// const connexionRoute = require("./src/routes/connexionRoute");
// const createAccountRoute = require("./src/routes/createAccountRoute");
// const collaboratorsRoute = require("./src/routes/collaboratorsRoute");
// const emailsRoute = require("./src/routes/emailsRoute");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

mongoDbConnection();

// app.use(connexionRoute);
// app.use(createAccountRoute);
// app.use(collaboratorsRoute);
// app.use(emailsRoute);

app.get("/", (req: any, res: any) => {
  return res.json({ message: "Hello world" });
});

app.listen(PORT, () => {
  console.log("server now running on port", PORT);
});
