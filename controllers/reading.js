const Book = require("../models/book");

exports.getReading = (req, res, next) => {
  req.user
    .populate("reading.items.bookId")
    .execPopulate()
    .then((user) => {
      const books = user.reading.items;
      console.log(books);
      res.render("reading/list", {
        path: "reading/list",
        pageTitle: "Your Reading",
        books: books,
        opt: ["Unread", "In Progress", "Finished"],
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getClear = (req, res, next) => {
  req.user
    .clearReading()
    .then((result) => {
      res.redirect("/books");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postReading = (req, res, next) => {
  const bookId = req.body.bookId;
  Book.findById(bookId)
    .then((book) => {
      return req.user.addToReading(book);
    })
    .then((result) => {
      console.log("redirecting");
      res.redirect("/reading/list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postStatus = (req, res, next) => {
  const bookId = req.body.bookId;
  const status = req.body.status;
  req.user
    .updateStatus(bookId, status)
    .then((result) => {
      console.log(result);
      res.redirect("/reading/list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postReadingDeleteBook = (req, res, next) => {
  const bookId = req.body.bookId;
  req.user
    .removeFromReading(bookId)
    .then((result) => {
      res.redirect("/reading/list");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.buildFavoriteBarChart = (req, res, next) => {
  res.render("reading/favorite", {
    path: "favorite-genre",
    pageTitle: "Chart",
    host: req.get("host"),
  });
};

exports.getFavoriteData = (req, res, next) => {
  req.user
    .populate("reading.items.bookId")
    .execPopulate()
    .then((user) => {
      const books = user.reading.items;
      const genreMap = new Map();
      const labels = [];
      const data = [];
      let favorites = [];
      let favoriteCount = 0;
      for (let book of books) {
        if (genreMap.has(book.bookId.genre)) {
          genreMap.set(book.bookId.genre, genreMap.get(book.bookId.genre) + 1);
        } else {
          genreMap.set(book.bookId.genre, 1);
        }
      }
      for (let [key, value] of genreMap) {
        labels.push(key);
        data.push(value);
        if (value > favoriteCount) {
          favorites = [key];
          favoriteCount = value;
        } else if (value === favoriteCount) {
          favorites.push(key);
        }
      }
      res.send({ data: data, labels: labels, favorites: favorites.toString() });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
