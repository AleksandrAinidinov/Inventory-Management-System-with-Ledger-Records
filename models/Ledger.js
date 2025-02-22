const { DataTypes } = require('sequelize');
const { sequelize } = require('./Inventory');
//const { all } = require('../server');

// Define the Ledger model with necessary fields
const Ledger = sequelize.define('Ledger', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    inventoryId: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.STRING, allowNull: false },
    details: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
}, {
    timestamps: true,
});

module.exports = { Ledger };
