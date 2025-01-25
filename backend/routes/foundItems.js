const express = require('express');
const router = express.Router();
const { connectDB, sql } = require('../config/db');

// Add a new found item
router.post('/', async (req, res) => {
  const { description, location, date_found, photo_url, contact_details } = req.body;
  try {
    const pool = await connectDB();
    await pool
      .request()
      .input('description', sql.NVarChar, description)
      .input('location', sql.NVarChar, location)
      .input('date_found', sql.Date, date_found)
      .input('photo_url', sql.NVarChar, photo_url)
      .input('contact_details', sql.NVarChar, contact_details)
      .query(
        `INSERT INTO found_items (description, location, date_found, photo_url, contact_details)
         VALUES (@description, @location, @date_found, @photo_url, @contact_details)`
      );
    res.status(201).send('Found item submitted successfully.');
  } catch (err) {
    res.status(500).send('Error submitting found item: ' + err.message);
  }
});

// Get all found items
router.get('/', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM found_items');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching found items: ' + err.message);
  }
});

module.exports = router;
