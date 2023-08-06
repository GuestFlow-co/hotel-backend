"use strict";

const express = require("express");
const model=require("../models/index")
const data = require("../models/index");
const modelsMiddleware = require("../middlewares/modelsMiddleware");
const {RoomFeatureModel,EmployeeRoleModel,EmployeeModel}=require('../models/index')
const CustomerModel = require('../models/index');
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
        const record = await req.model.readAll( model.RoomModel,model.PaymentModel,model.ServiceModel,model.CustomerModel)
        res.status(200).json(record);
      } else if(req.model.modelName == "rooms" ){
        const records = await req.model.findAll(
          RoomFeatureModel
        )
        res.status(200).json(records);

      }else if(req.model.modelName == "employee"){
        const records = await req.model.findAll(
          EmployeeRoleModel
        )
        res.status(200).json(records);

      } 
      // else if(req.model.modelName == "customer"){
      //   const records = await req.model.findAll(
      //     CustomerModel
      //   )
      //   res.status(200).json(records);

      // }
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
        const record = await req.model.readOne(id, model.RoomModel,model.PaymentModel,model.ServiceModel, model.CustomerModel);
        res.status(200).json(record);
      }else if(req.model.modelName == "rooms" ){
        const records = await req.model.findone(id,RoomFeatureModel )
        res.status(200).json(records);

      }else if(req.model.modelName == "employee"){
        const records = await req.model.findone(id,EmployeeRoleModel)
        res.status(200).json(records);

      } 
      // else if(req.model.modelName == "customer"){
      //   const records = await req.model.findone(id,CustomerModel)
      //   res.status(200).json(records);

      // }
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


