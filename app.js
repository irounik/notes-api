const express = require('express');

const app = express();

const sequelize = require('./db/database');

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
