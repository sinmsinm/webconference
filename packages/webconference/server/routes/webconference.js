'use strict';

//
var rooms = require('../controllers/rooms');

//Room authorization methods
var canUpdateRoom = function(req, res, next) {
 
	//Can update if user is admin or the room creator
	if (!req.user.isAdmin && req.room.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

//for now update permission = delete permission
var canDeleteRoom = canUpdateRoom;



// The Package is past automatically as first parameter
module.exports = function(Webconference, app, auth, database) {

  app.route('/rooms')
    .get(rooms.all)
    .post(auth.requiresLogin, rooms.create);
  app.route('/rooms/:roomId')
    .get(rooms.show)
    .put(auth.requiresLogin, canUpdateRoom, rooms.update)
    .delete(auth.requiresLogin, canDeleteRoom, rooms.destroy);

  // Finish with setting up the roomId param
  app.param('roomId', rooms.room);
};
	

