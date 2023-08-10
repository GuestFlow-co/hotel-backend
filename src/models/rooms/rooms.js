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
    rate: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), 
        defaultValue: [],
      },
      userRate:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      theRoomRate:{
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      roomPrice:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    roomStatus:{type:DataTypes.STRING,
        defaultValue:"Available"}

})
module.exports=Rooms