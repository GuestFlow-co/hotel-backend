"use strict";

const {dataBase, DataTypes} = require(".");
// const collection = require("../collection/collection");

const room_types = dataBase.define('room_types' , {
    type_id:{
         type : DataTypes.INTEGER,
         allowNull : false
    },
    type_name:{
        type : DataTypes.STRING,
   },
description:{
    type : DataTypes.STRING,
}
});
module.exports = room_types;

// const roomTypesCollection = new collection(room_types);
// module.exports = roomTypesCollection;
