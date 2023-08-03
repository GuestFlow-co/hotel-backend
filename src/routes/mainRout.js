"use strict";

const express = require("express");

const data = require("../models/index");
const modelsMiddleware = require("../middlewares/modelsMiddleware");

const router = express.Router();

router.param("model", modelsMiddleware);

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);


async function handleGetAll(req, res, next) {
    try {
      let allRecords = await req.model.get();
      res.status(200).json(allRecords);
    } catch (err) {
      next(err);
    }
  }


  async function handleGetOne(req, res, next) {
    try {
      let theRecord = await req.model.get(req.params.id);
      res.status(200).json(theRecord);
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


