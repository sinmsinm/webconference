'use strict';

angular.module('mean.webconference').controller('WebconferenceController', ['$scope', 'Global',  '$stateParams', '$location','Webconference',
  function($scope, Global, $stateParams, $location, Webconference) {
    $scope.global = Global;
    $scope.package = {
      name: 'webconference'
    };
	  
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
	  
	  
	  
  }
]);
