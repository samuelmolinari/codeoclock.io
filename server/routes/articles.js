'use strict';

var express = require('express'),
    router = express.Router(),
    articlesController = require('../app/controllers/articles');

/**
 * Get list of articles
 */
router.get('/', function(req, res, next) {
  var promise = articlesController.getAll({
      offset: req.query.offset,
      limit: req.query.limit
    });

  promise.then(function onFulfill(articles) {
    res.send({
      data: articles
    });
  }).then(null, next);
});

/**
 * Get article
 */
router.get('/:id', function(req, res, next) {
  var promise = articlesController.get({
      id: req.params.id,
    });

  promise.then(function onFulfill(article) {
    if(article) {
      res.send({
        data:article
      });
    } else {
      var message = 'Article not found';
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
 * Update an article
 */
router.put('/:id', function(req, res, next) {
  var promise = articlesController.update({
    id: req.params.id,
    data: req.body
  });

  promise.then(function onFulfill(feedback) {
    if(feedback && feedback.n > 0) {
      res.send({
        data: feedback
      });
    } else {
      var message = 'Article not found';
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
 * Create an article
 */
router.post('/', function(req, res, next) {
  var promise = articlesController.create(req.body);

  promise.then(function onFulfill(article) {
    res.status(201);
    res.send({
      data: article
    });
  }).then(null, next);
});

/**
 * Remove an article
 */
router.delete('/:id', function(req, res, next) {
  var promise = articlesController.remove({
      id: req.params.id,
    });

  promise.then(function onFulfill(feedback) {
    if(feedback.result && feedback.result.n > 0) {
      res.send({
        data: feedback
      });
    } else {
      var message = 'Article not found';
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
