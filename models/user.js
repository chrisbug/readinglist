const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  reading: {
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        status: { type: Number, required: true }
      }
    ]
  }

});

userSchema.methods.addToReading = function(book) {
  const readingBookIndex = this.reading.items.findIndex(ri => {
    return ri.bookId.toString() === book._id.toString();
  });
  const updatedReadingItems = [...this.reading.items];

  if (readingBookIndex >= 0) {
    return Promise.resolve('Book already in reading list.');
  } else {
    updatedReadingItems.push({
      bookId: book._id,
      status: 0
    });
  }
  const updatedReading = {
    items: updatedReadingItems
  };
  this.reading = updatedReading;
  return this.save();
};

userSchema.methods.updateStatus = function(bookId, status) {
  const i = this.reading.items.findIndex(ri => {
    return ri.bookId._id.toString() === bookId.toString();
  });
  if(i != -1 && status !== this.reading.items[i].status ) {
    this.reading.items[i].status = status;
    return this.save();
  };
  return Promise.resolve('Nothing to do');
};

userSchema.methods.removeFromReading = function(bookId) {
  const updatedReadingItems = this.reading.items.filter(item => {
    return item.bookId.toString() !== bookId.toString();
  });
  this.reading.items = updatedReadingItems;
  return this.save();
};

userSchema.methods.clearReading = function() {
  this.reading = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
