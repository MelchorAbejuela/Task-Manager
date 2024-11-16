const express = require("express");
const app = express();

const connectDB = require("./db_connect/db-connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json()); // parse incoming json into object so it will be available into req.body

const routes = require("./routes/routes");
app.use("/api/tasks", routes);

const start = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION_STRING);
    app.listen(4000, () => {
      console.log("Server is listening on port 4000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
