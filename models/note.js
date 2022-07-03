const { ObjectId } = require('mongodb');
const { getDb } = require('../db/database');

const getNotesCollection = () => {
  return getDb().collection('notes');
};

class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  save() {
    return getNotesCollection().insertOne(this);
  }

  static findAll() {
    return getNotesCollection().find().toArray();
  }

  static findById(id) {
    return getNotesCollection().findOne({ _id: ObjectId(id) });
  }

  static update(id, title, description) {
    const updateDoc = { $set: { title: title } };

    if (description) {
      updateDoc.$set = { ...updateDoc.$set, description: description };
    }

    return getNotesCollection().updateOne({ _id: ObjectId(id) }, updateDoc);
  }

  static delete(id) {
    return getNotesCollection().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Note;
