"use strict";

/// require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
app.use(cors());

const pageNotFound = require("./errorhandler/404");
const serverError = require("./errorhandler/500");
const authRoutes = require("./routes/authRoute");
const mainRout = require("./routes/mainRoute");
const restRout = require("./routes/RestToken");
const protectedRoute = require("./routes/protectedRoute");



 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 app.use(restRout); 
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