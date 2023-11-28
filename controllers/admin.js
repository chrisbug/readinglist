const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Book = require('../models/book');

exports.getAddBook = (req, res, next) => {
  res.render('admin/edit-book', {
    pageTitle: 'Add Book',
    path: '/admin/add-book',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddBook = (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const imageUrl = req.body.imageUrl;
  const isbn = req.body.isbn;
  const blurb = req.body.blurb;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-book', {
      pageTitle: 'Add Book',
      path: '/admin/add-book',
      editing: false,
      hasError: true,
      book: {
        title: title,
        author: author,
        genre: genre,
        imageUrl: imageUrl,
        isbn: isbn,
        blurb: blurb
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }
  const book = new Book({
    // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
    title: title,
    author: author,
    genre: genre,
    imageUrl: imageUrl,
    isbn: isbn,
    blurb: blurb
  });
  book
    .save()
    .then(result => {
      console.log('Created Book');
      return res.redirect('/books');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditBook = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const bookId = req.params.bookId;
  Book.findById(bookId)
    .then(book => {
      if (!book) {
        return res.redirect('/');
      }
      res.render('admin/edit-book', {
        pageTitle: 'Edit Book',
        path: '/admin/edit-book',
        editing: editMode,
        book: book,
        hasError: false,
        errorMessage: null,
        validationErrors: []
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const updatedTitle = req.body.title;
  const updatedAuthor = req.body.author;
  const updatedGenre = req.body.genre;
  const updatedIsbn = req.body.isbn;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.blurb;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('admin/edit-book', {
      pageTitle: 'Edit Book',
      path: '/admin/edit-book',
      editing: true,
      hasError: true,
      book: {
        title: updatedTitle,
        author: updatedAuthor,
        genre: updatedGenre,
        imageUrl: updatedImageUrl,
        isbn: updatedIsbn,
        blurb: updatedDesc,
        _id: bookId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Book.findById(bookId)
    .then(book => {
      book.title = updatedTitle;
      book.isbn = updatedIsbn;
      book.blurb = updatedDesc;
      book.author = updatedAuthor;
      book.genre = updatedGenre;
      book.imageUrl = updatedImageUrl;
      return book.save().then(result => {
        console.log('UPDATED BOOK!');
        res.redirect('/books');
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getBooks = (req, res, next) => {
  Book.find()
    .then(books => {
      console.log(books);
      res.render('/books', {
        books: books,
        pageTitle: 'Admin Books',
        path: '/books'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteBook = (req, res, next) => {
  const bookId = req.body.bookId;
  Book.deleteOne({ _id: bookId})
    .then(() => {
      console.log('DESTROYED BOOK');
      // Trys to remove book from reading list
      // If the book is deleted and left in reading list it
      // will cause an error
      req.user
      .removeFromReading(bookId)
      .then(() => {
        console.log('REMOVED BOOK FROM READING');
        res.redirect('/books');
      })
    .catch(err => console.log(err));
      // res.redirect('/books');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
