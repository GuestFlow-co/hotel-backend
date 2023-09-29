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
    room_capacity: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    rate: {
        type: DataTypes.ARRAY(DataTypes.JSON), 
        // defaultValue: [],
      },
      userRate:{
        type: DataTypes.FLOAT,
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
        defaultValue:"Available"},
        photoUrl: {
          type: DataTypes.ARRAY(DataTypes.STRING), 
        },
        coverPhoto:{
          type: DataTypes.STRING,
      }

})
module.exports=Rooms