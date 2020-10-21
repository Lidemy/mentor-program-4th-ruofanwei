/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prize.belongsTo(models.User);
    }
  };
  Prize.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    img: DataTypes.TEXT,
    weight: DataTypes.TEXT,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};