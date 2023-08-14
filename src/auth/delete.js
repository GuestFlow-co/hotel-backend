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

    if (req.method === "DELETE") {
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
    } else if (req.params.id) {
      const existingBooking = await models.customer.findone(req.user.user_id, BookingModel);
      if (
        (path === `rooms/${req.params.id}` ||
          path === `services/${req.params.id}` ||
          path === `guide/${req.params.id}` ||
          path === `tour/${req.params.id}` ||
          path === `bookings/${existingBooking.bookings[0].booking_id}`) &&
        req.user.role.includes("user")
      ) {
        next();
      } else {
        return _authError();
      }
    } else if (
      (path === "rooms" ||
        path === "services" ||
        path === "guide" ||
        path === "tour") &&
      req.user.role.includes("user")
    ) {
      next();
    } else if (req.user.role.includes("admin") || req.user.role.includes("employee")) {
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
