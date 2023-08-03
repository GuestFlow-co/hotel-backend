'use srtict'

const Rooms = (sequelize, DataTypes) => sequelize.define('Rooms', {
    Rooms_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,

    },
    room_number: {
        type: DataTypes.INTEGER,
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