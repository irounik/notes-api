const mongoose = require('mongoose');

const noteSechma = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
});

const Note = mongoose.model('Note', noteSechma);
module.exports = Note;
