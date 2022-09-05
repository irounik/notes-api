require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/config');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 3000;

const initApp = async () => {
  try {
    await db.initConnection();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

initApp();
