const { json } = require('express');
const Book = require('../models/book');

exports.getBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then(book => {
      res.render('book/book-detail', {
        book: book,
        pageTitle: book.title,
        path: '/books'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Book.find()
    .then(books => {
      res.render('book/index', {
        books: books,
        pageTitle: 'Bookshelf',
        path: '/'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
