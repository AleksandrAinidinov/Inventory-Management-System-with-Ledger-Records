const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models/Inventory');
const inventoryRoutes = require('./routes/inventory');
const ledgerRoutes = require('./routes/ledger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Mount routes
// Inventory routes at root path
app.use('/', inventoryRoutes);   

// Ledger routes at /ledger
app.use('/ledger', ledgerRoutes);   

// Sync the database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = app;
