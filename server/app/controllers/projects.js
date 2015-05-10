var mongoose = require('mongoose'),
    Project = mongoose.model('Project')

/**
 * Projects Controller
 */
var ProjectsController = function ProjectsController() {
};

/**
 * Get list of projects
 *
 * @param {Object} options        Query options
 * @param {number} options.offset Skip value
 * @param {number} options.limit  Limit value
 *
 * @return {Promise}
 */
ProjectsController.prototype.getAll = function getAll(options) {
  var skip  = options.offset,
      limit = options.limit,
      query = Project.find();

  if(skip) {
    query.skip(skip);
  }

  if(limit) {
    query.limit(limit);
  }

  return query.exec();
};

/**
 * Get a project by id
 *
 * @param {Object} args    Arguments
 * @param {String} args.id Project id
 *
 * @return {Promise}
 */
ProjectsController.prototype.get = function get(args) {
  var id = args.id;
  return Project.findById(id).exec();
};

/**
 * Update a project
 *
 * @param {Object} args      Arguments
 * @param {String} args.id   Project id
 * @param {Object} args.data Data to be updated
 * @param
 */
ProjectsController.prototype.update = function update(args) {
  delete args.data._id;
  delete args.data._v;
  delete args.createdAt;

  args.data.updatedAt = new Date();

  return Project.update({ _id: args.id }, { $set: args.data }).exec();
};

/**
 * Create a new project
 *
 * @param {Object} data Data represention of the new project
 *
 * @return {Promise}
 */
ProjectsController.prototype.create = function create(data) {
  var project = new Project(data);
  return project.save();
};

/**
 * Remove a project by id
 *
 * @param {Object} args    Arguments
 * @param {String} args.id Project id
 *
 * @return {Promise}
 */
ProjectsController.prototype.remove = function remove(args) {
  var id = args.id;
  return Project.remove({ _id: id }).exec();
};


module.exports = new ProjectsController();
