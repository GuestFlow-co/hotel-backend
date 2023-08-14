"use strict";
const nodemailer = require("nodemailer");

const transporter = require("../nodeMailer");
require("dotenv").config();
const { Op } = require("sequelize");

const express = require("express");
const model = require("../models/index");
const { DataTypes } = require("sequelize");
const data = require("../models/index");
const modelsMiddleware = require("../middlewares/modelsMiddleware");
const bearer = require("../auth/bearer");
const getmodel = require("../auth/get");

const {
  RoomFeatureModel,
  EmployeeRoleModel,
  EmployeeModel,
  bookings,
  TourModel,
  GuideModel,
  PaymentModel,
  BookingModel,
  RoomModel,
  EmployeeRoleAssignmentModel,
} = require("../models/index");
const router = express.Router();

router.param("model", modelsMiddleware);
// router.get("/rooms", handleGetunbookedRoom);
router.get("/:model", handleGetAll);
router.get("/:model/:id",handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);

// async function handleGetunbookedRoom(req,res,next) {
//   const start = new Date(req.query.startDate)
//   const end = new Date(req.query.endDate)
  
//   const records = await model.rooms.idrees(BookingModel,req.query.startDate,req.query.endDate);
//   res.status(200).json(records)
// }
async function handleGetAll(req, res, next) {
  try {
    if (req.model.modelName === "rooms") {
      // const { check_in_dat, check_out_dat } = req.query;
      const check_in_date_string = req.query.check_in_dat;
      const check_out_date_string = req.query.check_out_dat;
      
      console.log(typeof check_in_date_string ,typeof check_out_date_string ,"nnnnnnnnnnnnn");
      // Parse the date strings into Date objects
      const check_in_dat = new Date(check_in_date_string);
      const check_out_dat = new Date(check_out_date_string);  
      console.log( check_in_dat,"1561651");  
      console.log( check_out_dat,"1561651");  

      if (!check_in_dat && !check_out_dat) {
        const records = await req.model.findAll(RoomFeatureModel);

        res.status(200).json(records);
      }
      if (check_in_dat && check_out_dat) {
        const bookedRooms = await model.bookings.findAlls({
          where: {
            [Op.or]: [
              {
                check_in_date: {
                  [Op.between]: [check_in_dat, check_out_dat]
                }
              },
              
            ]
          }
          // where: {
          //   [Op.or]: [
          //     {
          //       check_in_date: { [Op.gt]: check_out_date },
          //       check_out_date: { [Op.lt]: check_in_date },
          //     },
          //   ],
          // },
          // attributes: ["theRoomID"],
          // raw: true,
        });
        console.log(bookedRooms[0].check_in_date,"ttttttttttttttt");
        const bookedRoomIds = bookedRooms.map((booking) => booking.theRoomID);
        console.log(bookedRoomIds,"11111111111");

        const records = await req.model.findAll(RoomFeatureModel);
        const allRoomsID = records.map((booking) => booking.Room_id);
        const unbookedRoomIds = allRoomsID.filter(
          (roomId) => !bookedRoomIds.includes(roomId)
          );
          console.log(unbookedRoomIds,"000000");


        const allRooms = [];

        for (let i = 0; i < unbookedRoomIds.length; i++) {
          let roombythisid = await req.model.findone(
            unbookedRoomIds[i],
            RoomFeatureModel
          );
          allRooms.push(roombythisid);
        }

        res.status(200).json(allRooms);
      }
    } else if (req.model.modelName == "bookings") {
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
    } else if (req.model.modelName == "guide") {
      const records = await req.model.findAll(TourModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "tour") {
      const records = await req.model.findAll(GuideModel);
      res.status(200).json(records);
    }else if (req.model.modelName == "user") {
      const records = await req.model.findAll(BookingModel);
      res.status(200).json(records)} 
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
        model.CustomerModel,
        model.TourModel,
        model.GuideModel
      );
      res.status(200).json(record);
    } else if (req.model.modelName == "rooms") {
      const records = await req.model.findone(id, RoomFeatureModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "employee") {
      const records = await req.model.findone(id, EmployeeRoleModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "guide") {
      const records = await req.model.findone(id, TourModel);
      res.status(200).json(records);
    } else if (req.model.modelName == "tour") {
      const records = await req.model.findone(id, GuideModel);
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
      let date_1 = new Date(req.body.check_out_date);
      let date_2 = new Date(req.body.check_in_date);
      let difference = date_1.getTime() - date_2.getTime();
      let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

      const roomID = req.body.theRoomID;
      const theRoom = await model.rooms.get(roomID);
      const totalprice = theRoom.roomPrice * TotalDays;
      req.body.bookingCost = totalprice;

      const paymentObj = await model.PaymentModel.create({
        amount: totalprice,
      });
      req.body.paymentID = paymentObj.payment_id;
    

let newRecord = await req.model.create(req.body);
      //email
      const userInfo = await model.users.get(newRecord.customer_id);
      const roomid = newRecord.theRoomID;
      let updatedbooking = await model.rooms.update(roomid, {
        roomStatus: "booked",
      });

      const mailOptions = {
        text: `Hello ,\n\nYour booking has been confirmed with the following details:\n\n${newRecord}\n\nThank you!\n\n'Welcome to our Hotel! We can't wait till we meet you ! 😍✨'`, 
        from: process.env.EMAIL,
        to: userInfo.email,
        subject: "Booking Confirmation",
      };
      // Send the email
      const info = await transporter.sendMail(mailOptions);

      res.status(201).json(newRecord);
    } else if (req.model.modelName === "bookedServices") {
      let newRecord = await req.model.create(req.body);
      const book = await model.bookings.readOne(
        newRecord.bookings_id,
        model.RoomModel,
        model.PaymentModel,
        model.ServiceModel,
        model.CustomerModel,
        model.GuideModel,
        model.TourModel
      );
      const servicePrice = parseInt(
        book.services.reduce((acc, service) => acc + service.cost, 0)
      );
      const existingPayment = await PaymentModel.findByPk(book.paymentID);

      await model.PaymentModel.update(
        { amount: existingPayment.amount+servicePrice  },
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
        model.CustomerModel,
        model.TourModel,
        model.GuideModel
      );
      const obj=[{
        previous_payment:req.body.current_payment,
        previous_payment_date: new Date()
      }]
      const existingPayment = await PaymentModel.findByPk(req.params.id);
      console.log(...existingPayment.previous_payments,"eeeeeeeeeeeeeee");
    const x =  await existingPayment.update({
        amount: existingPayment.amount -req.body.current_payment,
        previous_payments: [...existingPayment.previous_payments, obj]
      });
      console.log(x,"2222222222222222");

      let updatedbooking = await model.rooms.update(book.theRoomID, {
        roomStatus: "dirty",
      });
      res.status(200).json(updatedbooking);
    } else if (req.model.modelName === "rooms") {

      let updatedRecord = await req.model.update(req.params.id, req.body);
      const existingroom = await RoomModel.findByPk(req.params.id);
      const updatedRates = [
        ...existingroom.rate,
        {
          userRate: newUserRate
        }
      ];
      
      await existingroom.update({
        rate: updatedRates
      });
      
      // req.body.rate.push(req.body.userRate);
      const ratings = existingroom.rate.map(rate => rate.userRate)
            console.log(ratings);
      const totalRatings = ratings.length;
      const sumRatings = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 5;
      req.body.theRoomRate = averageRating;
      console.log(req.body.theRoomRate);
      const x = await req.model.update(req.params.id, req.body);
      res.status(200).json(x);
    } 
    
    
    else if (req.model.modelName === "bookings") {

      let updatedRecord = await req.model.update(req.params.id, req.body);
      const existingTour = await TourModel.findByPk(updatedRecord.tourId);
      if (!existingTour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      const newPeopleInTour = [
        ...existingTour.people_in_tour,
        req.body.number_of_seats_inTour,
      ];
      console.log(req.body.number_of_seats_inTour)
      const sumPeopleInTour = newPeopleInTour.reduce(
        (sum, value) => sum + value,
        0
      );
      let customerID = updatedRecord.customer_id
      let seats =updatedRecord.number_of_seats_inTour
      const obj=[{
        customerID:customerID,
        seats:seats
      }]
      console.log(obj);
      const availableSeat =
      sumPeopleInTour > 0 ? existingTour.max_amount - sumPeopleInTour : 1;
  
    if (sumPeopleInTour <= existingTour.max_amount) {
      await existingTour.update({
        people_in_tour: newPeopleInTour,
        availableSeat: availableSeat,
        tour_customer: [...existingTour.tour_customer, obj]
      });
    
    res.status(200).json(updatedRecord);

  

       const total_tour_price = existingTour.Seat_price * req.body.number_of_seats_inTour
       
       const existingBooking = await BookingModel.findByPk(req.params.id);

      existingBooking.total_tour_price = total_tour_price;

      await existingBooking.update({
        total_tour_price:total_tour_price
      });

      const existingPayment = await PaymentModel.findByPk(updatedRecord.paymentID);
     const total_amount = existingPayment.amount + total_tour_price

      await existingPayment.update({
        amount:total_amount
      });

      console.log(existingPayment)
        res.status(200).json(existingTour);

      } else {
        res.status(400).json({ message: "Exceeded max capacity" });
      }

    } 

     else {
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
