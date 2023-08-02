"use strict";

const {dataBase, DataTypes} = require(".");
// const collection = require("../collection/collection");

const employee_roles = dataBase.define('employee_roles' , {
    role_id:{
         type : DataTypes.INTEGER,
         allowNull : false
    },
    role_name:{
        type : DataTypes.STRING,
   }

});
module.exports = employee_roles;

// const employeeRolesCollection = new collection(employee_roles);
// module.exports = employeeRolesCollection;