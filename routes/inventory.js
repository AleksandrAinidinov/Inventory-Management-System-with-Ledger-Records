const express = require('express');
const router = express.Router();
const { Inventory } = require('../models/Inventory');
const { Ledger } = require('../models/Ledger');

// GET /
// List all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.findAll();
    res.render('index', { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET /add
// Render form to add a new inventory item
router.get('/add', (req, res) => {
  res.render('add');
});

// POST /add
// Handle form submission to create a new inventory item
router.post('/add', async (req, res) => {
  try {
    const { name, quantity, price, description } = req.body;
    const newItem = await Inventory.create({
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price).toFixed(2),
      description,
    });

    // Log ledger entry for creation
    await Ledger.create({
      inventoryId: newItem.id,
      action: 'created',
      details: `Item "${newItem.name}" created with quantity ${newItem.quantity} and price ${newItem.price}.`,
      date: Date.now(),
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding item');
  }
});

// GET /edit/:id
// Render form to edit an existing inventory item
router.get('/edit/:id', async (req, res) => {
  try {
    const item = await Inventory.findByPk(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.render('edit', { item });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST /edit/:id
// Handle form submission to update an inventory item
router.post('/edit/:id', async (req, res) => {
  try {
    const itemToEdit = await Inventory.findByPk(req.params.id);
    const { name, quantity, price, description } = req.body;

    await Inventory.update(
      {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price).toFixed(2),
        description,
      },
      { where: { id: req.params.id } }
    );

    // Log ledger entry for update
    await Ledger.create({
      inventoryId: itemToEdit.id,
      action: 'updated',
      details: `Item updated to: Name "${name}", quantity ${quantity}, price ${price}.`,
      date: Date.now(),
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

// POST /delete/:id
// Delete an inventory item
router.post('/delete/:id', async (req, res) => {
  try {
    const idemToDelete = await Inventory.findByPk(req.params.id);
    await Inventory.destroy({ where: { id: req.params.id } });
   
    // Log ledger entry for deletion
    await Ledger.create({
      inventoryId: idemToDelete.id,
      action: 'deleted',
      details: `Item with ID ${idemToDelete.id} was deleted.`,
      date: Date.now(),
    });

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
