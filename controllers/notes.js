const { ObjectId } = require('mongodb');
const Note = require('../models/note');
const response = require('../utils/response');

exports.getNotes = (req, res) => {
  Note.find({ createdBy: req.user.id.toString() })
    .then((notes) => response.success(res, notes))
    .catch((err) => response.serverError(res, err));
};

exports.addNote = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const createdBy = req.user.id;

  if (!title) {
    response.badRequest(res, 'Title is required to create note!');
    return;
  }

  new Note({ title: title, description: description, createdBy: createdBy })
    .save()
    .then(() => response.success(res, 'Note added successfully'))
    .catch((err) => response.serverError(res, err, 'Error in adding note'));
};

exports.getNoteById = (req, res) => {
  const id = req.params.id;
  if (!id || !ObjectId.isValid(id)) response.badRequest(res, 'Invalid note id!');

  Note.findById(id)
    .then((note) => {
      if (!note || note.createdBy.toString() != req.user.id.toString()) {
        response.notFound(res, `Note with id: ${id} was not found!`);
      } else {
        response.success(res, note);
      }
    })
    .catch((err) => {
      response.serverError(res, err, `Error in retrieving note with id: ${id}!`);
    });
};

exports.updateNote = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;

  if (!id || !ObjectId.isValid(id)) {
    response.badRequest(res, 'Note id is required to update note!');
    return;
  }

  if (!title) {
    response.badRequest(res, 'Title is required to update note!');
    return;
  }

  const updatedNote = { title: title };
  if (description) updatedNote.description = description;

  Note.updateOne({ _id: id, createdBy: req.user.id.toString() }, updatedNote)
    .then((success) => {
      console.log(success);
      if (!success) response.serverError(res, undefined, 'Something went wrong');
      if (success.modifiedCount == 0) response.notFound(res, `Can't find any note with ID: ${id}`);
      else response.success(res, `Successfully updated note with id: ${id}`);
    })
    .catch((err) => {
      console.log(err);
      response.serverError(res, err, `Couldn't update!`);
    });
};

exports.deleteNoteById = (req, res) => {
  const id = req.params.id;
  if (!id || !ObjectId.isValid(id)) return response.badRequest(res, `Invalid note ID: ${id}`);
  Note.deleteOne({ _id: id, createdBy: req.user.id.toString() })
    .then((success) => {
      console.log(success);
      if (!success) response.serverError(res, undefined, 'Something went wrong');
      if (success.deletedCount == 0) response.notFound(res, `Can't find any note with ID: ${id}`);
      else response.success(res, `Successfully deleted note with id: ${id}`);
    })
    .catch((err) => response.serverError(res, err, "Couldn't delete the note"));
};
