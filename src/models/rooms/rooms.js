'use srtict'

const Room = (sequelize, DataTypes) => sequelize.define('hotelRooms', {
    roomNumber: {
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