"use strict";

const {dataBase, DataTypes} = require(".");
// const collection = require("../collection/collection");

const room_features = dataBase.define('room_features' , {
    feature_id:{
         type : DataTypes.INTEGER,
         allowNull : false
    },
    feature_name:{
        type : DataTypes.STRING,
   },
description:{
    type : DataTypes.STRING,
}

});
module.exports = room_features;

// const roomFeaturesCollection = new collection(room_features);
// module.exports = roomFeaturesCollection;