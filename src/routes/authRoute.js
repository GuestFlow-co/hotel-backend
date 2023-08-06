'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models');
const basicAuth = require('../auth/basic.js')
const bearerAuth = require('../auth/bearer.js')
const permissions = require('../auth/acl.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  console.log(req.user)
 res.status(200).json(req.user);

});

authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
    const userRecords = await users.model.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  });

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;