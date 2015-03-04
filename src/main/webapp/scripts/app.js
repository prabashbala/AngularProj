/**
 * Created by Prabash Balasuriya on 25/02/2015.
 */

var app = angular.module('displayProjects', ['ui.router', 'angularUtils.directives.uiBreadcrumbs']);

app.factory('dataService', function ($http) {
	return {
		getProjects : function (input) {
			// return the promise directly.
			return $http.get(input).then(function (result) {
				// resolve the promise as the data
				return result.data;
			});
		}
	}
});

app.controller('displayProjectsController', function ($scope, $location, dataService) {
	dataService.getProjects('getProjects').then(function (results) {
		$scope.projects = results;
	});

	$scope.selectTab = function (setTab) {
		$scope.tab = setTab;
		$location.path("/project/" + $scope.tab.id);
	};
});

app.controller('displayIssuesListController', function ($scope, $location, $stateParams, dataService) {

	dataService.getProjects('getProject/' + $stateParams.projectid).then(function (results) {
		$scope.issuelist = results.issues;
	});

	$scope.selectIssueTab = function (setTab) {
		$scope.issuetab = setTab;
		$location.path("/issue/" + $scope.issuetab.id);
	};
});

app.controller('displayIssueController', function ($scope, $stateParams, dataService) {
	dataService.getProjects('getIssue/' + $stateParams.issueid).then(function (results) {
		$scope.issuedetails = results;
	});
});

app.config(function ($stateProvider, $urlRouterProvider) {

	//
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/home");
	//
	// Now set up the states
	$stateProvider
	.state('home', {
		url : "/home",
		views : {
			"@" : { // here we are using absolute name targeting
				templateUrl : 'templates/show_projects.html',
				controller : 'displayProjectsController',
			},
		},
		data : {
			displayName : 'Home',
		}
	}).state('home.project', {
		url : "^/project/:projectid",
		views : {
			"@" : { // here we are using absolute name targeting
				templateUrl : 'templates/show_issueslist.html',
				controller : 'displayIssuesListController',
			},
		},
		parent : 'home',
		data : {
			displayName : 'Project',
		}
	}).state('home.project.issue', {
		url : "^/issue/:issueid",
		views : {
			"@" : { // here we are using absolute name targeting
				templateUrl : 'templates/show_issue.html',
				controller : 'displayIssueController',
			},
		},
		parent : 'home',
		data : {
			displayName : 'Issue',
		}
	});
});
