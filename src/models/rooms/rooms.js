'use srtict'

const Rooms = (sequelize, DataTypes) => sequelize.define('Room', {
    Room_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        field: 'room_id'

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
    roomStatus:{type:DataTypes.STRING}

})
module.exports=Rooms