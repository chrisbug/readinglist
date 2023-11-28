const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-book', adminController.getAddBook);

router.post(
  '/add-book',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    // body('isbn').isISBN('10'),
    body('blurb')
      .isLength({ min: 5, max: 400 })
      .trim(),
    body('isbn')
    .isLength(10 || 13)
    .trim()
  ],
  adminController.postAddBook
);

router.get('/edit-book/:bookId', adminController.getEditBook);

router.post(
  '/edit-book',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    // body('isbn').isISBN(10),
    body('blurb')
      .isLength({ min: 5, max: 400 })
      .trim(),
    body('isbn')
    .isLength(10 || 13)
    .trim()

  ],
  adminController.postEditBook
);

router.post('/delete-book', adminController.postDeleteBook);

module.exports = router;
