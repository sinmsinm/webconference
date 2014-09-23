'use strict';

angular.module('mean.webconference').factory('Webconference', ['$resource',
   function($resource) {
         return $resource('rooms/:roomId', {
		 roomId: '@_id'
	});
   }
]);
