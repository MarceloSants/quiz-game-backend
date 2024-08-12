const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

function defineQuestions() {
  sequelize.define('questions', {
    themeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: sequelize.models.themes, key: 'id' },
    },
    title: { type: DataTypes.TEXT, allowNull: false },
    answer1: { type: DataTypes.TEXT, allowNull: false },
    answer2: { type: DataTypes.TEXT, allowNull: false },
    answer3: { type: DataTypes.TEXT, allowNull: false },
    answer4: { type: DataTypes.TEXT, allowNull: false },
    correctAnswer: { type: DataTypes.INTEGER, allowNull: false },
  });
}

module.exports = { defineQuestions };
