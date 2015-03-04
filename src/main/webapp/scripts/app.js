/**
 * Created by Prabash Balasuriya on 25/02/2015.
 */

var app = angular.module('displayProjects',['ngRoute']);

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

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
	 when('/', {
        templateUrl: 'templates/show_projects.html',
        controller: 'displayProjectsController'
      }).
      when('/projects', {
        templateUrl: 'templates/show_projects.html',
        controller: 'displayProjectsController'
      }).
      when('/issueslist/:projectid', {
        templateUrl: 'templates/show_issueslist.html',
        controller: 'displayIssuesListController'
      }).
	  when('/issue/:issueid', {
        templateUrl: 'templates/show_issue.html',
        controller: 'displayIssueController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

app.controller('displayProjectsController', function($scope,$location,dataService) {
	//get projects
	$scope.isProjectsloaded=false;	
	dataService.getProjects('getProjects').then(function(results) {
		$scope.projects = results;
	});

	$scope.selectTab=function(setTab) {	
		$scope.tab = setTab;		
		$location.path("/issueslist/"+$scope.tab.id);	
		$scope.isProjectsloaded=true;		
	  };	  
	  $scope.isSelected=function(checkTab) {	
		return $scope.tab === checkTab;
	  };
	  
});

app.controller('displayIssuesListController', function($scope,$location,$routeParams,dataService) {
	dataService.getProjects('getProject/'+$routeParams.projectid).then(function(results) {
		$scope.issuelist = results.issues;
	});	
	
	$scope.selectIssueTab=function(setTab) {	
		$scope.issuetab = setTab;	
		$location.path("/issue/"+$scope.issuetab.id);				
	  };
	  
	  $scope.isIssueSelected=function(checkTab) {	
		return $scope.issuetab === checkTab;
	  };	
});

app.controller('displayIssueController', function($scope,$routeParams,dataService) {
	dataService.getProjects('getIssue/'+$routeParams.issueid).then(function(results) {
		$scope.issuedetails = results;
	});	
});

