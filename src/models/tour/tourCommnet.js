"use strict";

const comment = (sequelize, DataTypes) => 
 sequelize.define("Comment", {
  comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    theTour_id:  {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    commentName: {
      type: DataTypes.STRING(1000),
    },
    Email: {
      type: DataTypes.STRING(1000),
    },
    comment: {
      type: DataTypes.STRING(1000),
    },
    Rating: {
      type: DataTypes.STRING(100),
    },
  });



module.exports = comment;
