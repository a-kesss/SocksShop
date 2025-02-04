'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsToMany(models.Sock, {
        through: {
          model: models.Like,
        },
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Sock, {
        through: {
          model: models.Cart,
        },
        foreignKey: 'userId',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};