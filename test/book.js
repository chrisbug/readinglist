const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const Book = require('../models/book');

chai.use(chaiHttp);


describe('Book Routes', function() {

  let book;

  before(function(done) {
    // Create a book before running the tests
    book = new Book({
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Test Genre',
      imageUrl: 'http://test.com',
      isbn: '1234567890',
      blurb: 'Test blurb'
    });
    book.save()
      .then(() => done())
      .catch(err => done(err));
  });

  it('should get all books on / GET', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.be.an('string');
        done();
      });
  });
  
  it('should get all books on /books GET', function(done) {
    chai.request(app)
      .get('/books')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.be.an('string');
        done();
      });
  });

  it('should create a single book on /admin/add-book POST', function(done) {
      const form = {
        title: '5badf72403fd8b5be0366e81',
        author: 'Test Author',
        genre: 'Test Genre',
        imageUrl: 'http://test.com',
        isbn: '1234567890',
        blurb: 'Test blurb'
      };
  
      chai.request(app)
        .post('/admin/add-book')
        .type('form')
        .send(form)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          Book.deleteOne({ title: form.title })
          .then(() => done()).catch(err => done(err));
        });
    });

  it('should get a single book on /books/:bookId GET', function(done) {
    
    chai.request(app)
      .get(`/books/${book._id}`)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should update a single book on /admin/edit-book/:bookId POST', function(done) {
    const form = { // This should be a valid book ID
      bookId: book._id.toString(),
      title: 'Test Book EDITED',
      author: 'Test Author EDITED',
      genre: 'Test Genre EDITED',
      imageUrl: 'http://test.com',
      isbn: '1234567891',
      blurb: 'Test blurb EDITED'
    };


    chai.request(app)
    .post('/admin/edit-book')
    .type('form')
    .send(form)
    .end(function(err, res) {
      expect(res).to.have.status(200);
      Book.findById(book._id).then(updatedBook => {
        expect(updatedBook.title).to.equal(form.title);
        expect(updatedBook.author).to.equal(form.author);
        expect(updatedBook.genre).to.equal(form.genre);
        expect(updatedBook.imageUrl).to.equal(form.imageUrl);
        expect(updatedBook.isbn).to.equal(form.isbn);
        expect(updatedBook.blurb).to.equal(form.blurb);
        done();
      }).catch(err => done(err));
    });
  });


  it('should delete a single book on /admin/delete-book/:bookId POST', function(done) {
    chai.request(app)
      .post(`/admin/delete-book`)
      .type('form')
      .send({ bookId: book._id.toString() })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        Book.findById(book._id).then(deletedBook => {
          expect(deletedBook).to.be.null;
          done();
        }).catch(err => done(err));
      });
  });

  after(function(done) {
    // Clean up the test book after the tests run
    Book.deleteOne({ _id: book._id }).then(() => done().catch(err => done(err)));
  });

});
