'use srtict'

const Room = (sequelize, DataTypes) => sequelize.define('hotelRooms', {
    room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unieqe: true
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate: { type: DataTypes.INTEGER, },
    status:{type:DataTypes.STRING}

})
module.exports=Room