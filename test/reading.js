const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const Book = require('../models/book');
const User = require('../models/user');

chai.use(chaiHttp);

describe('Reading List Routes', function() {

    let book;

    before(function(done) {
        // Create a book before running the tests
        book = new Book({
          title: 'Test Book Reading',
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

    it('should get the reading list on /reading GET', function(done) {
    chai.request(app)
        .get('/reading/list')
        .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.be.an('string');
        done();
        });
    });

    it('should add a book to the reading list /reading POST', function(done) {
        const form = {bookId: book._id.toString()};
        chai.request(app)
        .post('/reading/list')
        .type('form')
        .send(form)
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should update reading status /reading/update-status POST', function(done) {
        chai.request(app)
        .post('/reading/update-status')
        .type('form')
        .send({bookId: book._id.toString(), status: 1})
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('should get favorite Data list on /reading/favorite-data GET', function(done) {
        chai.request(app)
        .get('/reading/favorite-data')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('data');
            expect(res.body).to.have.property('labels');
            expect(res.body).to.have.property('favorites');
            done();
        });
    });

    it('should remove a book from the reading list /reading/delete-item POST', function(done) {
        chai.request(app)
            .post('/reading/delete-item')
            .type('form')
            .send({bookId: book._id.toString()})
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should clear the reading list then clear /reading/clear GET', function(done) {
        chai.request(app)
        .get('/reading/clear')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            done();
        });
    });

    after(function(done) {
        // Clean up the test book after the tests run
        Book.deleteOne({ _id: book._id }).then(() => done()).catch(err => done(err));
    });
});