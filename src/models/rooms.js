'use srtict'

const Room = (sequelize, DataTypes) => sequelize.define('hotelRooms', {
    roomNumber: {
        type: DataTypes.INTEGER,
        allowNull: flase,
        unieqe: true
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: flase,
    },
    rate: { type: DataTypes.INTEGER, },
    status:{type:DataTypes.STRING}

})
module.exports=Room