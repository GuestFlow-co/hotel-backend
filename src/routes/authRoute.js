"use strict";

const express = require("express");
const authRouter = express.Router();

const { users } = require("../models");
const basicAuth = require("../auth/basic.js");
const bearerAuth = require("../auth/bearer.js");
const permissions = require("../auth/acl.js");

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: {
      user_id: req.user.user_id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      username: req.user.username,
      role: req.user.role,
      updatedAt: req.user.updatedAt,
      createdAt: req.user.createdAt,
    },
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, permissions('read'), async (req, res, next) => {
    const userRecords = await users.model.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(userRecords);
  });


authRouter.get("/secret", bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area");
});

module.exports = authRouter;
