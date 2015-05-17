'use strict';

var mongoose = require('mongoose'),
    Article = mongoose.model('Article');

/**
 * Articles Controller
 */
var ArticlesController = function ArticlesController() {
};

/**
 * Get list of articles
 *
 * @param {Object} options        Query options
 * @param {number} options.offset Skip value
 * @param {number} options.limit  Limit value
 *
 * @return {Promise}
 */
ArticlesController.prototype.getAll = function getAll(options) {
  var skip  = options.offset,
      limit = options.limit,
      query = Article.find();

  if(skip) {
    query.skip(skip);
  }

  if(limit) {
    query.limit(limit);
  }

  return query.exec();
};

/**
 * Get a article by id
 *
 * @param {Object} args    Arguments
 * @param {String} args.id Article id
 *
 * @return {Promise}
 */
ArticlesController.prototype.get = function get(args) {
  var id = args.id;
  return Article.findById(id).exec();
};

/**
 * Update a article
 *
 * @param {Object} args      Arguments
 * @param {String} args.id   Article id
 * @param {Object} args.data Data to be updated
 * @param
 */
ArticlesController.prototype.update = function update(args) {
  delete args.data._id;
  delete args.data.__v;
  delete args.data.createdAt;
  delete args.data.updatedAt;

  return Article.update({ _id: args.id }, args.data).exec();
};

/**
 * Create a newarticle
 *
 * @param {Object} data Data represention of the new article
 *
 * @return {Promise}
 */
ArticlesController.prototype.create = function create(data) {
  var article = new Article(data);
  return article.save();
};

/**
 * Remove a article by id
 *
 * @param {Object} args    Arguments
 * @param {String} args.id Article id
 *
 * @return {Promise}
 */
ArticlesController.prototype.remove = function remove(args) {
  var id = args.id;
  return Article.remove({ _id: id }).exec();
};


module.exports = new ArticlesController();
