const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = () => {
  return MongoClient.connect(process.env.MONGO_DB_URL)
    .then((client) => {
      console.log('Connected to MongoDB');
      _db = client.db('notes');
    })
    .catch((err) => console.log(err));
};

exports.mongoConnect = mongoConnect;
exports.getDb = () => {
  if (_db) return _db;
  throw 'Not connected to DB yet';
};
