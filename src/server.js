"use strict";

/// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const pageNotFound = require("./errorhandler/404");
const serverError = require("./errorhandler/500");
const authRoutes = require("./routes/authRoute");
const mainRout = require("./routes/mainRoute");
const protectedRoute = require("./routes/protected-route");



 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));


app.use(authRoutes);
app.use(mainRout);
app.use("/api",protectedRoute);



app.use("*", pageNotFound);
app.use(serverError);

function start(port) {
  app.listen(port, () => console.log(`up and running on port: ${port}`));
}

module.exports = {
  app,
  start,
};