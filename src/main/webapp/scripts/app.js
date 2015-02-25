/**
 * Created by Prabash Balasuriya on 25/02/2015.
 */

var app = angular.module('displayProjects', ['ngRoute']);

app.factory('dataService', function($http) {
	return {
		getProjects : function() {
			// return the promise directly.
			return $http.get('getProjects').then(function(result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.factory('dataService2', function($http) {
	return {
		getProjects : function(input) {
			// return the promise directly.
			return $http.get('getProject/'+input).then(function(result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.factory('dataService3', function($http) {
	return {
		getProjects : function(input) {
			// return the promise directly.
			return $http.get('getIssue/'+input).then(function(result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.controller('displayProjectsController', function($scope,$location, dataService,dataService2,dataService3) {
	dataService.getProjects().then(function(results) {
		$scope.projects = results;
	});
	$scope.tab=1;
	$scope.selectTab=function(setTab) {	
		$scope.tab = setTab;
		if(typeof setTab.fields === 'undefined'){
		
			dataService2.getProjects(setTab.id).then(function(results) {
				$scope.projects = results.issues;
			});
		
		}else {
		
			dataService3.getProjects(setTab.id).then(function(results) {
				$scope.projects = results.issuetype;
			});
		}
		
	  };
	  
	  $scope.isSelected=function(checkTab) {	
		return $scope.tab === checkTab;
	  };
	
});

