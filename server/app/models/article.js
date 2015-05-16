'use strict';

var mongoose      = require('mongoose'),
    timestamps    = require('mongoose-timestamp'),
    MetaSchema    = require('./partial_schemas/meta'),
    Schema        = mongoose.Schema,
    ArticleSchema = null;

ArticleSchema = new Schema({
  title:    { type: String, required: true },
  content:  { type: String, required: true },
  coverUrl: { type: String },
  live:     { type: Boolean, default: false },
  meta:     MetaSchema
});

ArticleSchema.plugin(timestamps);

mongoose.model('Article', ArticleSchema);
