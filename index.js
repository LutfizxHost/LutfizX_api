const express = require('express');
const app = express();
require('dotenv').config();

const temanAi = require('./temanai');
app.use('/api/temanai', temanAi);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API aktif di http://localhost:' + PORT));