"use strict";

const models = require("../models/index");
const { users, BookingModel, CustomerModel } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    console.log(req.path);
    const path = req.path.substring(1);
    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.model.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

    if (path.startsWith("bookings/") && req.user.role.includes("user")) {
      const bookingId = path.split("/")[1];
      const existingBooking = await models.customer.findone(req.user.user_id, BookingModel);
      if (existingBooking && existingBooking.bookings.some(booking => booking.booking_id === bookingId)) {
        next();
      } else {
        return _authError();
      }
    } else if (req.user.role.includes("admin")) {
      next();
    } else {
      return _authError();
    }
  } catch (e) {
    return _authError();
  }

  function _authError() {
    next("Invalid Login");
  }
};
