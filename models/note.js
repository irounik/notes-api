const { Schema, Types, model } = require('mongoose');
const user = require('./user');

const noteSechma = new Schema({
  title: { type: String, required: true },
  description: String,
  createdBy: {
    type: Types.ObjectId,
    ref: user,
  },
});

const Note = model('note', noteSechma);
module.exports = Note;
