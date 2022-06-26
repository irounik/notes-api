const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./db/database');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/notes', notesRoutes);

const PORT = process.env.PORT || 3000;

const initApp = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

initApp();
