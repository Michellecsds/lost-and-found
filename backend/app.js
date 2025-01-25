const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const foundItemsRoutes = require('./routes/foundItems');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/found-items', foundItemsRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
