'use strict';

/**
 * @ngdoc overview
 * @name socialcops
 * @description
 * # socialcops
 *
 * Main module of the application.
 */

angular.module('socialcops', [ 'ui.router', 'ngAnimate', 'ngResource' ])
		.config(function($stateProvider, $urlRouterProvider) {

			$urlRouterProvider.when('/dashboard', '/dashboard/overview');
			$urlRouterProvider.otherwise('/dashboard');

			$stateProvider.state('base', {
				abstract : true,
				url : '',
				templateUrl : 'views/base.html'
			}).state('dashboard', {
				url : '/dashboard',
				parent : 'base',
				templateUrl : 'views/dashboard.html',
				controller : 'DashboardCtrl'
			}).state('overview', {
				url : '/overview',
				parent : 'dashboard',
				templateUrl : 'views/dashboard/overview.html'
			}).state('delhireport', {
				url : '/delhireport',
				parent : 'dashboard',
				templateUrl : 'views/dashboard/delhireport.html',
				controller : 'DelhiReportCtrl'
			});

		});

/*google.load("visualization", "1", {
	packages : [ "corechart", "bar", "orgchart" ]
});
google.load("visualization", "1.1", {
	packages : [ "table" ]
});
*/