const path = require('path');
const proccess = require('process');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGO_USER = proccess.env.MONGO_USER;
const MONGO_PASSWORD = proccess.env.MONGO_PASSWORD;
const MONGO_CLUSTER = proccess.env.MONGO_CLUSTER;
const MONGO_DBNAME = proccess.env.MONGO_DBNAME;
const MONGO_USER_ID = proccess.env.MONGO_USER_ID;

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODB_URI =
  `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true`;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/book');
const readingRoutes = require('./routes/reading');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById(MONGO_USER_ID)
    .then(user => {
      if (!user) {
        console.log('No user found');
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(bookRoutes);
app.use('/reading', readingRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
  });
  console.log(error);
});
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

module.exports = app;