const express = require('express');
const auth = require('../middlewares/auth');
const notesController = require('../controllers/notes.js');

const router = express.Router();

router.get('/', auth, notesController.getNotes);

router.post('/add', auth, notesController.addNote);

router.get('/:id', auth, notesController.getNoteById);

router.post('/update', auth, notesController.updateNote);

router.delete('/delete/:id', auth, notesController.deleteNoteById);

module.exports = router;
