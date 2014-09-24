'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var RoomSchema = new Schema({
  name: {
    type: String,
    required: true
  },user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});
							
RoomSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Room', RoomSchema);
