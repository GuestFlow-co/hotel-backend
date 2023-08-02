'use strict'
const Services = (sequelize, DataTypes) => sequelize.define('allServices', {
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    serviceName:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    description:{
        type:DataTypes.INTEGER,

    },
    cost:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }

})