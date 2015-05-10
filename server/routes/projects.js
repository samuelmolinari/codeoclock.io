var express = require('express'),
    router = express.Router(),
    projectsController = require('../app/controllers/projects');

/**
 * Get list of projects
 */
router.get('/', function(req, res, next) {
  var promise = projectsController.getAll({
      offset: req.query.offset,
      limit: req.query.limit
    });

  promise.then(function onFulfill(projects) {
    res.send({
      data: projects
    });
  }).then(null, next);
});

/**
 * Get a project
 */
router.get('/:id', function(req, res, next) {
  var promise = projectsController.get({
      id: req.params.id,
    });

  promise.then(function onFulfill(project) {
    if(project) {
      res.send({
        data: project
      });
    } else {
      var message = 'Project not found';
      res.status(404).send({
        error: {
          message: message
        },
        message : message
      });
    }
  }).then(null, next);
});

/**
 * Update a project
 */
router.put('/:id', function(req, res, next) {
  var promise = projectsController.update({
    id: req.params.id,
    data: req.body
  });

  promise.then(function onFulfill(project) {
    res.send({
      data: project
    });
  }).then(null, next);
});

/**
 * Create a project
 */
router.post('/', function(req, res, next) {
  var promise = projectsController.create(req.body);

  promise.then(function onFulfill(project) {
    res.send({
      data: project
    });
  }).then(null, next);
});

/**
 * Remove a project
 */
router.delete('/:id', function(req, res, next) {
  var promise = projectsController.remove({
      id: req.params.id,
    });

  promise.then(function onFulfill(outcome) {
    if(outcome.result && outcome.result.n > 0) {
      res.send({
        data: outcome
      });
    } else {
      var message = 'Project not found';
      res.status(404).send({
        error: {
          message: message
        },
        message : message
      });
    }
  }).then(null, next);
});

module.exports = router;
