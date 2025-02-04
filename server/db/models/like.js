'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Sock, { foreignKey: 'sockId' });
    }
  }
  Like.init(
    {
      userId: DataTypes.INTEGER,
      sockId: DataTypes.INTEGER,
      SockId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Like',
    },
  );
  return Like;
};
