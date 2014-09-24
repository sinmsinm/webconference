'use strict';

angular.module('mean.webconference').controller('WebconferenceController', ['$scope', 'Global',  '$stateParams', '$location','Webconference',
  function($scope, Global, $stateParams, $location, Webconference) {
    $scope.global = Global;
    $scope.package = {
      name: 'webconference'
    };
	 
	
	var SIGNALING_SERVER = 'ws://localhost:12034';
	
	var rtcMultiConnection = new window.RTCMultiConnection();
	  
	rtcMultiConnection.sdpConstraints.mandatory = {
		OfferToReceiveAudio: true,
		OfferToReceiveVideo: true
	};

	rtcMultiConnection.openSignalingChannel = function(config) {
		config.channel = config.channel || this.channel;
		
		
		var websocket = new WebSocket(SIGNALING_SERVER);
		
		websocket.channel = config.channel;
		
		websocket.onopen = function() {
			websocket.push(JSON.stringify({
				open: true,
				channel: config.channel
			}));
			if (config.callback)
				config.callback(websocket);
		};
		
		websocket.onmessage = function(event) {
			config.onmessage(JSON.parse(event.data));
		};

		websocket.push = websocket.send;
		
		websocket.send = function(data) {
			if (websocket.readyState !== 1) {
						return setTimeout(function() {
							websocket.send(data);
						}, 1000);
			}

			websocket.push(JSON.stringify({
				data: data,
				channel: config.channel
			}));
		};
	};
  
	
    $scope.isOwner = function(room) {
      if (!room || !room.user) return false;
      return $scope.global.isAdmin || room.user._id === $scope.global.user._id;
    };  
	  
	  var iceServers = [];

	// STUN server
	iceServers.push({
		url: 'stun:23.21.150.121:3478'
	});

	// TURN server
	iceServers.push({
		url: 'turn:turn.bistri.com:80',
		credential: 'homeo',
		username: 'homeo'
	});

 	rtcMultiConnection.iceServers = iceServers;
 
	$scope.find = function() {
		Webconference.query(function(rooms) {
			$scope.rooms = rooms;
		});
	};
	  
	$scope.findOne = function() {
		
		Webconference.get({
			roomId: $stateParams.roomId
		}, function(room) {
			$scope.room = room;
			rtcMultiConnection.connect(room._id);
		});
	};
	  
	$scope.create = function(isValid) {
		if (isValid) {
			var webconference = new Webconference({
				name: this.name
			});
			webconference.$save(function(response) {
				$location.path('webconference/' + response._id);
			});
			
			this.name = '';
		} else {
			$scope.submitted = true;
		}
	};  
	  
	$scope.openRoom = function(){
		rtcMultiConnection.open($scope.room._id);	
	};
	  
  }
]);
