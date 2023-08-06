'use srtict'

const Rooms = (sequelize, DataTypes) => sequelize.define('Room', {
    Room_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,

    },
    room_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate: { type: DataTypes.INTEGER, },
    status:{type:DataTypes.STRING}

})
module.exports=Rooms