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
  }
});
							
				
mongoose.model('Room', RoomSchema);
