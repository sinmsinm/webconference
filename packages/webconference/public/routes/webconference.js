'use strict';

angular.module('mean.webconference').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('all conference rooms', {
      url: '/webconference',
      templateUrl: 'webconference/views/list.html'
    }).state('create conference room',{
		url: '/webconference/create',
		templateUrl: 'webconference/views/create.html'
	}).state('view room',{
		url: '/webconference/:roomId',
		templateUrl: 'webconference/views/view.html'	
	});
  }
]);