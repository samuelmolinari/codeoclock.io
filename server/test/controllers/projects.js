require('../../app/models/project');

var request = require('supertest'),
    mongoose = require('mongoose'),
    Project = mongoose.model('Project');

describe('Projects Controller', function() {
  describe('#get', function(done) {
    var project = null;

    before(function(done) {
      monky.projects.create('Project')
        .then(function (model) {
          project = model;
        }).then(done, done);
    });

    context('when fetching an existing project', function() {
      it('responds with a 200', function(done) {
        request(app)
          .get('/projects/' + project._id)
          .expect(200, done);
      });

      it('returns the project matching the given id', function(done) {
        request(app)
          .get('/projects/' + project._id)
          .end(function(err, res) {
            expect(res.body.data._id).to.eql(project.id);
            done();
          });
      });
    });

    context('when the project does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .get('/projects/554e4e4cc52df62d299a3d4b')
          .expect(404, done);
      });

      it('returns a error object and message string', function(done) {
        request(app)
          .get('/projects/554e4e4cc52df62d299a3d4b')
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('#create', function(done) {
    beforeEach(function(done) {
      mongoose.connection.db.dropCollection('projects', function(err, result) {
        if(!err) {
          done();
        }
      });
    });

    it('responds with a 201', function(done) {
      request(app)
        .post('/projects')
        .send({ name: 'John Doe Project' })
        .expect(201, done);
    });

    it('adds a new project to the collection', function(done) {
      request(app)
        .post('/projects')
        .send({ name: 'John Doe Project' })
        .end(function(err, res) {
          Project.count({}).exec()
            .then(function(count) {
              expect(count).to.eql(1);
              done();
            });
        });
    });

    it('returns the newly created project', function(done) {
      var data = {
        name: 'John Doe Project',
        description: 'Hello World!',
        live: true
      };

      request(app)
        .post('/projects')
        .send(data)
        .end(function(err, res) {
          Project.findOne({}).exec()
            .then(function(project) {
              expect(project._id.toString()).to.eql(res.body.data._id);
              for(var key in data) {
                expect(project[key]).to.eql(res.body.data[key]);
              }
              done();
            });
        });
    });
  });

  describe('#update', function(done) {
    var project = null;

    before(function(done) {
      monky.projects.create('Project')
        .then(function (model) {
          project = model;
        }).then(done, done);
    });

    context('when updating an existing project', function() {
      it('responds with a 200', function(done) {
        request(app)
          .put('/projects/' + project._id)
          .send({ description: 'Hello World' })
          .expect(200, done);
      });

      it('updates the given project', function(done) {
        request(app)
          .put('/projects/' + project._id)
          .send({ description: 'Hello World' })
          .end(function(err, res) {
            Project.findById(project.id.toString()).exec()
              .then(function(updatedProject) {
                expect(updatedProject.description).to.eql('Hello World');
                done();
              });
          });
      });
    });

    context('when the project does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .put('/projects/554e4e4cc52df62d299a3d4b')
          .send({ name: '123' })
          .expect(404, done);
      });

      it('returns a error object and message string', function(done) {
        request(app)
          .put('/projects/554e4e4cc52df62d299a3d4b')
          .send({ name: '123' })
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
            done();
          });
      });
    });
  });

  describe('#delete', function(done) {
    var project = null;

    before(function(done) {
      monky.projects.create('Project')
        .then(function (model) {
          project = model;
        }).then(done, done);
    });

    context('when deleting an existing project', function() {
      it('responds with a 200', function(done) {
        request(app)
          .delete('/projects/' + project._id)
          .expect(200, done);
      });
    });

    context('when the project does not exist', function() {
      it('responds with a 404 not found', function(done) {
        request(app)
          .delete('/projects/554e4e4cc52df62d299a3d4b')
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
