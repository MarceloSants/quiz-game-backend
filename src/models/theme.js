const DataTypes = require('sequelize');
const { sequelize } = require('../config/sequelize');

function defineThemes() {
  sequelize.define('themes', {
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
  });
}

module.exports = { defineThemes };
