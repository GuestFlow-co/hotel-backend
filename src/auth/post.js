"use strict";

const models = require("../models/index");
const { users, BookingModel, CustomerModel } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    const path = req.path.substring(1);
    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.model.authenticateToken(token);
    
    req.user = validUser;
    req.token = validUser.token;
    
    console.log(req,"00000000000000");
     
      if (
        (path === "bookings" || path === "bookedServices"  ) &&  req.user.role.includes("user")
      ) {
        next();
      } 
     else if (req.user.role.includes("admin") ) {
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

