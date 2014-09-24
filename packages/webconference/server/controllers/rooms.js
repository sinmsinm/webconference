'use strict';

//Just start webrtc signaling server
require('webrtc-signaling-server');

var mongoose = require('mongoose'),
  Room = mongoose.model('Room');


exports.room = function(req, res, next, id) {
	 Room.load(id, function(err, room) {
		if (err) return next(err);
      	if (!room) return next(new Error('Failed to load Room ' + id));
      	req.room = room;
        next();
    });
	
};

exports.create = function(req, res) {
  var room = new Room(req.body);
  room.user = req.user;

  req.assert('name', 'You must enter a name').notEmpty();
	
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
	
  room.save(function(err) {
    if (err) {
		 var modelErrors = [];

          if (err.errors) {

            for (var x in err.errors) {
              modelErrors.push({
                param: x,
                msg: err.errors[x].message,
                value: err.errors[x].value
              });
            }

            res.status(400).send(modelErrors);
          }
	}
	
	res.send(room);
  });
	
};

exports.update = function(req, res) {
};

exports.destroy = function(req, res) {
};

exports.all = function (req,res){
	 Room
    .find().populate('user', 'name username')
    .exec(function(err, roomlist) {
   		if (err) return res.status(400).send(new Error ('Failed to load rooms'));
		res.json (roomlist);
    });
};

exports.show = function (req,res){
	  res.json(req.room || null);
};