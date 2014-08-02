'use strict';

angular.module('mean.webconference').controller('WebconferenceController', ['$scope', 'Global', 'Webconference',
  function($scope, Global, Webconference) {
    $scope.global = Global;
    $scope.package = {
      name: 'webconference'
    };
  }
]);
