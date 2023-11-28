const path = require('path');

const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.get('/', bookController.getIndex);

router.get('/books', bookController.getIndex);

router.get('/books/:bookId', bookController.getBook);

module.exports = router;
