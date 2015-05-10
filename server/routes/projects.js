var express = require('express');
var router = express.Router();
var projectsController = require('../controllers/projects');

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
      payload: projects
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
    res.send({
      payload: project
    });
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
      payload: project
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
      payload: project
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

  promise.then(function onFulfill(project) {
    res.send({
      payload: project
    });
  }).then(null, next);
});

module.exports = router;
