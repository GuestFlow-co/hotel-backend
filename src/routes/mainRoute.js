"use strict";
const nodemailer = require("nodemailer");

const transporter = require("../nodeMailer");
require("dotenv").config();
const { Op } = require("sequelize");
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
  GuideModel,
  RoomModel,
  EmployeeRoleAssignmentModel,
  
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
    if (req.model.modelName === "rooms") {
      const { check_in_date, check_out_date } = req.query;

      if (check_in_date && check_out_date) {
        const bookedRooms = await model.bookings.findAlls({
          where: {
            check_in_date: { [Op.lte]: check_out_date },
            check_out_date: { [Op.gte]: check_in_date },
          },
          attributes: ["theRoomID"],
          raw: true,
        });

        const bookedRoomIds = bookedRooms.map((booking) => booking.theRoomID);
        console.log(bookedRoomIds);

        const allRooms = [];

        for (let i = 0; i < bookedRoomIds.length; i++) {
          let roombythisid = await req.model.get(bookedRoomIds[i]);
          allRooms.push(roombythisid);
        }
        
        res.status(200).json(allRooms);
      } else {
        const allRooms = await req.model.get();
        res.status(200).json(allRooms);
      }
    }

    else if (req.model.modelName == "bookings") {
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
      const records = await req.model.readTow(EmployeeRoleModel, RoomModel);
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
    } else {
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
      const userInfo = await model.users.get(newRecord.customer_id);

      const roomid = newRecord.theRoomID;
      let updatedbooking = await model.rooms.update(roomid, {
        roomStatus: "booked",
      });

      const mailOptions = {
        text: `Hello ${userInfo.username},\n\nYour booking has been confirmed with the following details:\n\n${newRecord}\n\nThank you!`,
        from: process.env.EMAIL,
        to: userInfo.email,
        subject: "Booking Confirmation",
        text: `'Welcome to our Hotel! We can't wait till we meet you ! 😍✨'`,
      };
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);

      res.status(201).json(newRecord);
    } else if (req.model.modelName === "bookedServices") {
      let newRecord = await req.model.create(req.body);
      const book = await model.bookings.readOne(
        newRecord.bookings_id,
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel
      );
      console.log(book, "00000000000000000");
      const servicePrice = parseInt(
        book.services.reduce((acc, service) => acc + service.cost, 0)
      );

      await model.PaymentModel.update(
        { amount: servicePrice + book.bookingPrice },
        { where: { payment_id: book.paymentID } }
      );
      res.status(201).json(newRecord);
    } else {
      let newRecord = await req.model.create(req.body);
      res.status(201).json(newRecord);
    }
  } catch (err) {
    next(err);
  }
}

async function handleUpdate(req, res, next) {
  try {
    if (req.model.modelName === "payments") {
      let updatedRecord = await req.model.update(req.params.id, req.body);
      console.log(updatedRecord, "1111111111111111111111");
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

module.exports = router;
