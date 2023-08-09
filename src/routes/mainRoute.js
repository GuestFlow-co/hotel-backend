"use strict";
const nodemailer = require("nodemailer");
const transporter = require("../nodeMailer");
require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });
const express = require("express");
const model = require("../models/index");
const { DataTypes } = require("sequelize");
const data = require("../models/index");
const modelsMiddleware = require("../middlewares/modelsMiddleware");
const {
  RoomFeatureModel,
  EmployeeRoleModel,
  EmployeeModel,
  bookings,
  TourModel,
  GuideModel
} = require("../models/index");
const router = express.Router();

router.param("model", modelsMiddleware);

router.get("/:model", handleGetAll);

router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

async function handleGetAll(req, res, next) {
  try {
    if (req.model.modelName == "bookings") {
      const record = await req.model.readAll(
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel,
        model.GuideModel,
        model.TourModel
      );
      res.status(200).json(record);
    } else if (req.model.modelName == "rooms") {
      const records = await req.model.findAll(RoomFeatureModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "employee") {
      const records = await req.model.findAll(EmployeeRoleModel);
      res.status(200).json(records);
    }
    else if (req.model.modelName == "guide") {
      const records = await req.model.findAll(TourModel);
      res.status(200).json(records);
    }else if (req.model.modelName == "tour") {
      const records = await req.model.findAll(GuideModel);
      res.status(200).json(records);
    }
    else {
      let allRecords = await req.model.get();
      res.status(200).json(allRecords);
    }
  } catch (err) {
    next(err);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const id = req.params.id;
    if (req.model.modelName == "bookings") {
      const record = await req.model.readOne(
        id,
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel
      );
      res.status(200).json(record);
    } else if (req.model.modelName == "rooms") {
      const records = await req.model.findone(id, RoomFeatureModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "employee") {
      const records = await req.model.findone(id, EmployeeRoleModel);
      res.status(200).json(records);
    } 

    else {
      let id = req.params.id;
      let theRecord = await req.model.get(id);
      res.status(200).json(theRecord);
    }
  } catch (err) {
    next(err);
  }
}

async function handleCreate(req, res, next) {
  try {
    if (req.model.modelName === "bookings") {
      
  
      const bookingPrice = parseInt(req.body.bookingPrice);

      // Create the payment instance directly with the bookingPrice
      const paymentObj = await model.PaymentModel.create({
        amount: bookingPrice,
      });

      req.body.paymentID = paymentObj.payment_id;

      let newRecord = await req.model.create(req.body);
       const userInfo = await model.users.get(newRecord.customer_id)

     const roomid= newRecord.theRoomID
     let updatedbooking = await model.rooms.update(roomid, {
      roomStatus: "booked",
    });
     
    const mailOptions = {
      text: `Hello ${userInfo.username},\n\nYour booking has been confirmed with the following details:\n\n${newRecord}\n\nThank you!`,
      from: process.env.EMAIL,
      to: userInfo.email,
      subject: 'Booking Confirmation',
      text : `'Welcome to our Hotel! We can't wait till we meet you ! 😍✨'`,
    };
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

      res.status(201).json(newRecord);
    } else if (req.model.modelName === "bookedServices"){
      let newRecord = await req.model.create(req.body);
      const book = await model.bookings.readOne(
        newRecord.bookings_id,
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel
        );
        console.log(book,"00000000000000000");
      const servicePrice = parseInt(book.services.reduce((acc, service) => acc + service.cost, 0));

     await model.PaymentModel.update(
        { amount: servicePrice + book.bookingPrice},
        { where: { payment_id: book.paymentID } }
      );
      res.status(201).json(newRecord);

    }
    else {
      let newRecord = await req.model.create(req.body);
      res.status(201).json(newRecord);
    }
  } catch (err) {
    next(err);
  }
}
  
async function handleUpdate(req, res, next) {
  try {
    if (req.model.modelName === "payments"){
      let updatedRecord = await req.model.update(req.params.id, req.body);
      console.log(updatedRecord,"1111111111111111111111");
      const book = await model.bookings.readOne(
        updatedRecord.payment_id,
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel
        );
              let updatedbooking = await model.rooms.update(book.theRoomID, {
          roomStatus: "dirty",
        });
        res.status(200).json(updatedbooking);

    } else {
      let updatedRecord = await req.model.update(req.params.id, req.body);
      res.status(200).json(updatedRecord);

    }
  } catch (err) {
    next(err);
  }
}

async function handleDelete(req, res, next) {
  try {
    let deletedRecord = await req.model.delete(req.params.id);
    res.status(200).json(deletedRecord);
  } catch (err) {
    next(err);
  }
}







// async function handleGetAll(req, res, next) {
//   try {
//     const modelName = req.params.model;
//     const modelInstance = model[modelName];

//     if (!modelInstance) {
//       return res.status(404).json({ error: "Model not found." });
//     }

//     const checkInDate = req.query.check_in_date;
//     const checkOutDate = req.query.check_out_date;

//     if (checkInDate && checkOutDate) {
//       if (!hasAttributes(modelInstance, ["check_in_date", "check_out_date"])) {
//         const filteredBookings = await modelInstance.readAll(
//           model.RoomModel,
//           model.PaymentModel,
//           model.ServiceModel,
//           model.CustomerModel
//         );

//         res.status(200).json(filteredBookings);
//       } else {
//         const bookedRooms = await modelInstance.findAll({
//           where: {
//             check_in_date: { [Op.lte]: checkOutDate },
//             check_out_date: { [Op.gte]: checkInDate },
//           },
//           attributes: ["room_id"],
//           raw: true,
//         });
//         const allRooms = await model.RoomModel.findAll();
//         const availableRooms = allRooms.filter(
//           (room) =>
//             !bookedRooms.some((bookedRoom) => bookedRoom.room_id === room.id)
//         );

//         res.status(200).json(availableRooms);
//       }
//     } else {
//       let allRecords = await modelInstance.get();
//       res.status(200).json(allRecords || []); 
//     }
//   } catch (err) {
//     next(err);
//   }
// }
// async function handleGetOne(req, res, next) {
//   try {
//     const id = req.params.id;
//     const modelName = req.params.model;
//     const modelInstance = model[modelName];

//     if (!modelInstance) {
//       return res.status(404).json({ error: "Model not found." });
//     }

//     if (modelName === "bookings") {
//       if (!hasAttributes(modelInstance, ["check_in_date", "check_out_date"])) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Invalid request. Model must have 'check_in_date' and 'check_out_date' attributes.",
//           });
//       }

//       const record = await modelInstance.readOne(
//         id,
//         model.RoomModel,
//         model.PaymentModel,
//         model.ServiceModel,
//         model.CustomerModel
//       );
//       res.status(200).json(record);
//     } else if (modelName === "rooms") {
//       const records = await modelInstance.findone(id, RoomFeatureModel);
//       res.status(200).json(records);
//     } else if (modelName === "employee") {
//       const records = await modelInstance.findone(id, EmployeeRoleModel);
//       res.status(200).json(records);
//     } else if (modelName === "payments") {

//     } else {
//       let theRecord = await modelInstance.get(id);
//       res.status(200).json(theRecord);
//     }
//   } catch (err) {
//     next(err);
//   }
// }







// function hasAttributes(modelInstance, attributeNames) {
//   const rawAttributes = modelInstance?.rawAttributes;
//   return attributeNames.every((attr) => rawAttributes?.hasOwnProperty(attr));
// }












module.exports = router;
