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
      it('returns the project matching the given id', function(done) {
        request(app)
          .get('/projects/' + project._id)
          .expect(200)
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
          .expect(404)
          .end(function(err, res) {
            expect(res.body.error).to.be.an('Object');
            expect(res.body.message).to.be.a('string');
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
      it('updates the given project', function(done) {
        request(app)
          .put('/projects/' + project._id)
          .send({ description: 'Hello World' })
          .expect(200)
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
      it('response with a 404 not found', function(done) {
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
      it('response with a 404 not found', function(done) {
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
