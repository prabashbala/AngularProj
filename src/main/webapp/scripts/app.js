/**
 * Created by Prabash Balasuriya on 25/02/2015.
 */

var app = angular.module('displayProjects', []);

app.factory('dataService', function($http) {
	return {
		getProjects : function() {
			// return the promise directly.
			return $http.get('hi').then(function(result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.controller('displayProjectsController', function($scope, dataService) {
	dataService.getProjects().then(function(results) {
		$scope.projects = results;
	});

});
