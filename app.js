const express = require("express");
const app = express();

const connectDB = require("./db_connect/db-connect");
require("dotenv").config();

app.use(express.static("./public"));
app.use(express.json()); // parse incoming json into object so it will be available into req.body

const routes = require("./routes/routes");
app.use("/api/tasks", routes);

const errorHandler = require("./middle_ware/error-handler");
app.use(errorHandler);

const notFound = require("./middle_ware/not-found");
app.use(notFound);

const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.DB_CONNECTION_STRING);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
