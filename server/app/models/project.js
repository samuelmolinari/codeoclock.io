'use strict';

var mongoose      = require('mongoose'),
    timestamps    = require('mongoose-timestamp'),
    MetaSchema    = require('./partial_schemas/meta'),
    Schema        = mongoose.Schema,
    ProjectSchema = null;

ProjectSchema = new Schema({
  name:        { type: String, required: true, unique: true },
  description: { type: String },
  live:        { type: Boolean, default: false },
  url:         { type: String },
  meta:        MetaSchema
});

ProjectSchema.plugin(timestamps);

mongoose.model('Project', ProjectSchema);
