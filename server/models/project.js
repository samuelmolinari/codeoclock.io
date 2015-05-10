var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    ProjectSchema = null;

ProjectSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  live: { type: Boolean, default: false },
  url: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});

ProjectSchema.pre('save', function(next){
  now = new Date();

  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

mongoose.model('Project', ProjectSchema);
