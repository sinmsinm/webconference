'use strict';

angular.module('mean.webconference').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('webconference example page', {
      url: '/webconference/example',
      templateUrl: 'webconference/views/index.html'
    });
  }
]);
