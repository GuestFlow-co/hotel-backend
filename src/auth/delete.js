const models = require("../models/index");
const { users} = require("../models/index");

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

    console.log(req.user.user_id);
      const existingBooking = await models.bookings.findAlls({
        where: {
          customer_id: req.user.user_id
        }
      });
    console.log(existingBooking);
      if (
        (
          path === `user/${req.user.user_id}` ||
          path === `bookings/${existingBooking[0].booking_id}`) &&
        req.user.role.includes("user")
      ) {
        console.log("999999999999999");
        next();
      } 
     else if (

      req.user.role.includes("employee") &&
      (
      path === `bookings/${req.params.id}`      
      )){
        next();
        console.log("66666666666666");
    }  
    else if (req.user.role.includes("admin") ) {
      console.log("0000000000000000000");
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
