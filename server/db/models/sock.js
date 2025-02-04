'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sock extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: {
          model: models.Like,
        },
        foreignKey: 'sockId',
      });
      this.belongsToMany(models.User, {
        through: {
          model: models.Cart,
        },
        foreignKey: 'sockId',
      });
    }
  }
  Sock.init(
    {
      color: DataTypes.STRING,
      pattern: DataTypes.STRING,
      patternColor: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Sock',
    },
  );
  return Sock;
};
