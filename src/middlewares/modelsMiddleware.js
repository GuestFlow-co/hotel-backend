"use strict";

const modelsMiddleware = require("../models/index");

module.exports = (req, res, next) => {
    const modelName = req.params.model;
    if (modelsMiddleware[modelName]) {
        req.model = modelsMiddleware[modelName];
        next();
    } else {
        next("Invalid Model");
    }
}