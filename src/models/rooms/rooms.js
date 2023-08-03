'use srtict'

const Rooms = (sequelize, DataTypes) => sequelize.define('Rooms', {
    room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate: { type: DataTypes.INTEGER, },
    status:{type:DataTypes.STRING}

})
module.exports=Rooms