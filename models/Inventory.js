const pg = require('pg');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Connect to PostgreSQL using the connection URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect: 'postgres',
    dialectModule: pg
  });

// Define the Inventory model with necessary fields
const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = { Inventory, sequelize };
