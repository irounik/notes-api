const Note = require('../models/note');
const response = require('../utils/response');

exports.getNotes = (req, res) => {
  Note.findAll()
    .then((notes) => response.success(res, notes))
    .catch((err) => response.serverError(res, err));
};

exports.addNote = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title) {
    response.badRequest(res, 'Title is required to create note!');
    return;
  }

  Note.create({ title: title, description: description })
    .then(() => response.success(res, 'Note added successfully'))
    .catch((err) => response.serverError(res, err, 'Error in adding note'));
};

exports.getNoteById = (req, res) => {
  const id = req.params.id;
  if (!id) {
    response.badRequest(res, 'Note id is required to retrieve note!');
  }
  Note.findByPk(id)
    .then((note) => {
      if (!note) response.notFound(res, `Note with id: ${id} was not found!`);
      else response.success(res, note);
    })
    .catch((err) => {
      response.serverError(res, err, `Error in retrieving note with id: ${id}!`);
    });
};

exports.updateNote = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;

  if (!id) {
    response.badRequest(res, 'Note id is required to update note!');
    return;
  }

  if (!title) {
    response.badRequest(res, 'Title is required to update note!');
    return;
  }

  Note.findByPk(id)
    .then((note) => {
      if (!note) {
        response.notFound(res, `Didn't find any note with id: ${id}`);
        return note;
      }
      return note.update({ title: title, description: description });
    })
    .then((success) => {
      if (success) response.success(res, `Successfully updated note with id: ${id}`);
      else response.serverError(res, undefined, 'Something went wrong');
    })
    .catch((err) => console.log(err));
};

exports.deleteNoteById = (req, res) => {
  const id = req.params.id;
  if (!id) return response.badRequest(res, `Invalid note ID: ${id}`);
  Note.findOne({ where: { id: id } })
    .then((note) => {
      if (!note) {
        response.notFound(res, `Didn't find any note with id: ${id}`);
        return note;
      }
      return note.destroy();
    })
    .then((success) => {
      if (success) response.success(res, `Successfully deleted note with id: ${id}`);
      else response.serverError(res, undefined, 'Something went wrong');
    })
    .catch((err) => response.serverError(res, err, "Couldn't delete the note"));
};
