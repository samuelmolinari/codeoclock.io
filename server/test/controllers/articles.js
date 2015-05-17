'use strict';
/* global app, monky */

require('../../app/models/article');

var request = require('supertest'),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

describe('Articles Controller', function() {
  describe('#get', function() {
    var article = null;

    before(function(done) {
      monky.articles.create('Article')
        .then(function (model) {
          article = model;
        }).then(done, done);
    });

    context('when fetching an existing article', function() {
      it('responds with a 200', function(done) {
        request(app)
          .get('/articles/' + article._id)
          .expect(200, done);
      });

      it('returns the article matching the given id', function(done) {
        request(app)
          .get('/articles/' + article._id)
          .end(function(err, res) {
            expect(res.body.data._id).to.eql(article.id);
            done();
          });
      });

    });

    context('when the article does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .get('/articles/554e4e4cc52df62d299a3d4b')
          .expect(404, done);
      });

      it('returns a error object and message string', function(done) {
        request(app)
          .get('/articles/554e4e4cc52df62d299a3d4b')
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('#create', function() {
    beforeEach(function(done) {
      mongoose.connection.db.dropCollection('articles', function(err) {
        if(!err) {
          done();
        }
      });
    });

    it('responds with a 201', function(done) {
      request(app)
        .post('/articles')
        .send({ title: 'John Doe Article', content: '<h1>Hi!</h1>' })
        .expect(201, done);
    });

    it('adds a new article to the collection', function(done) {
      request(app)
        .post('/articles')
        .send({ title: 'John Doe Article', content: '<h1>Hi!</h1>' })
        .end(function() {
          Article.count({}).exec()
            .then(function(count) {
              expect(count).to.eql(1);
              done();
            });
        });
    });

    it('returns the newly created article', function(done) {
      var data = {
        title: 'John Doe Article',
        content: 'Hello World!',
        live: true,
        meta: {
          title: 'metatitle',
          description: 'metadescription',
          themeColor: 'themecolor'
        }
      };

      request(app)
        .post('/articles')
        .send(data)
        .end(function(err, res) {
          Article.findOne({}).exec()
            .then(function(article) {
              expect(article._id.toString()).to.eql(res.body.data._id);
              var meta = data.meta;
              delete data.meta;

              for(var metaKey in meta) {
                expect(meta[metaKey]).to.eql(article.meta[metaKey]);
              }

              for(var key in data) {
                expect(article[key]).to.equal(res.body.data[key]);
              }
              done();
            })
            .then(null, function(err) {console.log(err);});
        });
    });
  });

  describe('#update', function() {
    var article = null;

    before(function(done) {
      monky.articles.create('Article')
        .then(function (model) {
          article = model;
        }).then(done, done);
    });

    context('when updating an existing article', function() {
      it('responds with a 200', function(done) {
        request(app)
          .put('/articles/' + article._id)
          .send({ content: 'Hello World' })
          .expect(200, done);
      });

      it('updates the given article', function(done) {
        request(app)
          .put('/articles/' + article._id)
          .send({ content: 'Brand new content' })
          .end(function() {
            Article.findById(article.id.toString()).exec()
              .then(function(updatedArticle) {
                expect(updatedArticle.content).to.eql('Brand new content');
                done();
              });
          });
      });
    });

    context('when the article does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .put('/articles/554e4e4cc52df62d299a3d4b')
          .send({ name: '123' })
          .expect(404, done);
      });

      it('returns a error object and message string', function(done) {
        request(app)
          .put('/articles/554e4e4cc52df62d299a3d4b')
          .send({ name: '123' })
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('#delete', function() {
    var article = null;

    before(function(done) {
      monky.articles.create('Article')
        .then(function (model) {
          article = model;
        }).then(done, done);
    });

    context('when deleting an existing article', function() {
      it('responds with a 200', function(done) {
        request(app)
          .delete('/articles/' + article._id)
          .expect(200, done);
      });
    });

    context('when the article does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .delete('/articles/554e4e4cc52df62d299a3d4b')
          .expect(404)
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    });
  });
});
