"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    verified : DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return User;
};
