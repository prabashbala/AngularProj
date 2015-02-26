/**
 * Created by Prabash Balasuriya on 25/02/2015.
 */

var app = angular.module('displayProjects',[]);

app.factory('dataService', function($http) {
	return {
		getProjects :  function(input) {
			// return the promise directly.
			return $http.get(input).then(function(result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.controller('displayProjectsController', function($scope,dataService) {
	//get projects
	dataService.getProjects('getProjects').then(function(results) {
		$scope.projects = results;
	});

	$scope.selectTab=function(setTab) {	
		$scope.tab = setTab;
		if(typeof setTab.fields === 'undefined'){
		
			dataService.getProjects('getProject/'+setTab.id).then(function(results) {
				$scope.projects = results.issues;
			});
		
		}else {		
			dataService.getProjects('getIssue/'+setTab.id).then(function(results) {
			//alert(results.fields.issuetype.description);
			var empty;
				$scope.projects =empty;
				$scope.issuedetails = results;
			});
		}
		
	  };
	  
	  $scope.isSelected=function(checkTab) {	
		return $scope.tab === checkTab;
	  };
	
});

