/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable */
'use strict';
const {
  Model,
} = require('sequelize');
const moment = require('moment'); // require

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User);
    }
  }
  Article.init({
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY.MM.DD');
      },
    },
    updatedAt: DataTypes.DATEONLY,

  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
