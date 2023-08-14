"use strict";

const models = require("../models/index");
const { users, BookingModel,CustomerModel } = require("../models/index");

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

    
    const existingBooking = await models.customer.findone(req.user.user_id,BookingModel);
    if (req.params.id ) {
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
        path === "tour"   ) &&
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
    next("Unauthorized");
  }
};
