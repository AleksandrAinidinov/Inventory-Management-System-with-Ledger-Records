// Aleksandr Ainidinov 8905450
// 2025-02-21 6:30:00 PM

const express = require('express');
const router = express.Router();
const { Ledger } = require('../models/Ledger');

// GET /
// List all inventory items
router.get('/', async (req, res) => {
    try {
      // sort in descending order
      const operations = await Ledger.findAll({ order: [['id', 'DESC']] });
      res.render('ledger', { operations });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;