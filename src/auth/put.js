"use strict";

const models = require("../models/index");
const { users, BookingModel,CustomerModel } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    // console.log(req.path);
    const path = req.path.substring(1);
    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.model.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;

    console.log(path);
    // const existingBooking = await models.bookings.findAlls({
    //   where: {
    //     customer_id: req.user.user_id
    //   }
    // });
    // console.log(req.user.user_id);
    // console.log(existingBooking);
    //        console.log(req.user.role.includes("admin"))

      if (
        req.user.role.includes("user") &&
        (path === `rooms/${existingBooking[0].theRoomID}` ||
          path === `user/${req.user.user_id}` ||
          path === `payments/${existingBooking[0].paymentID}` ||
          path === `bookings/${existingBooking[0].booking_id}`) 
      ) {
        next();
      } 
     else if (
    
      req.user.role.includes("employee")  &&
      (path === `rooms/${req.params.id}` ||
      path === `bookings/${req.params.id}` ||
      path === `payments/${req.params.id}` ||
      path === `bookedServices/${req.params.id}` ||
      path === `RoomsFeatures/${req.params.id}`)
   
    ) {
      next();
    }
    else if (
      req.user.role.includes("admin") ) {
        console.log("00000000000");
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
