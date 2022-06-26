const express = require('express');
const notesController = require('../controllers/notes.js');

const router = express.Router();

router.get('/', notesController.getNotes);

router.post('/add', notesController.addNote);

router.get('/:id', notesController.getNoteById);

router.post('/update', notesController.updateNote);

router.delete('/delete/:id', notesController.deleteNoteById);

module.exports = router;
