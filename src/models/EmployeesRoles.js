const Room = (sequelize, DataTypes) => sequelize.define('hotelRooms', {
    role_id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: flase,
    },
    

})
module.exports=Room