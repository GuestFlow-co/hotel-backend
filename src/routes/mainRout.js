"use strict";

const express = require("express");
const model=require("../models/index")
const data = require("../models/index");
const modelsMiddleware = require("../middlewares/modelsMiddleware");

const router = express.Router();

router.param("model", modelsMiddleware);

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);
// router.get("/:model/getAllRooms/:id", handleAllRooms)


// async function handleAllRooms(req, res){
//   const id = req.params.id;
//   const record= await req.model.readAll(id, model.RoomModel)
//   res.status(200).json(record);

// }
async function handleGetAll(req, res, next) {
    try {
     if (req.model.modelName == "bookings") {
        // const id = req.params.id;
        const record = await req.model.readAll( model.RoomModel,model.PaymentModel);
        res.status(200).json(record);
      } else {
        let allRecords = await req.model.get();
        res.status(200).json(allRecords);

      }
     
    } catch (err) {
      next(err);
    }
  }


  async function handleGetOne(req, res, next) {
    try {
      if (req.model.modelName == "bookings") {
        const id = req.params.id;
        const record = await req.model.readOne(id, model.RoomModel,model.PaymentModel);
        res.status(200).json(record);
      } else {
        // console.log("000000000000000000000",typeof req.model.modelName );
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
      let newRecord = await req.model.create(req.body);
      res.status(201).json(newRecord);
    } catch (err) {
      next(err);
    }
  }

  async function handleUpdate(req, res, next) {
    try {
      let updatedRecord = await req.model.update(req.params.id, req.body);
      res.status(200).json(updatedRecord);
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


