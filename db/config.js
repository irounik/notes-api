const mongoose = require('mongoose');

exports.initConnection = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL, { dbName: process.env.DB_NAME });
};
