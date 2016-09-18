(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.config(function ($stateProvider) {
			var states = [ 
				{
					name: 'home',
					url: '/home',
					component: 'home'
				},
				{
					name: 'login',
					url: '/login',
					component: 'login'
				},
				{
					name: 'orderNew',
					url: '/launchVehicles/orderNew',
					component: 'orderLaunchVehicle',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'development',
					url: '/launchVehicles/development',
					component: 'vehicleDevelopment',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'completed',
					url: '/launchVehicles/inventory',
					component: 'vehicleInventory',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'schedule',
					url: '/flight/schedule',
					component: 'scheduleFlight',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'progress',
					url: '/flight/progress',
					component: 'flightProgress',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'northAmericanSpaceports',
					url: '/spaceports/north-america',
					component: 'spaceports',
					resolve: {
						location: function(){return 'north america';},
						authenticate: authenticate
					}
				},
				{
					name: 'europeanSpaceports',
					url: '/spaceports/europe',
					component: 'spaceports',
					resolve: {
						location: function(){return 'europe';},
						authenticate: authenticate
					}
				},
				{
					name: 'asianSpaceports',
					url: '/spaceports/asia',
					component: 'spaceports',
					resolve: {
						location: function(){return 'asia';},
						authenticate: authenticate
					}
				},
				{
					name: 'researchEngine',
					url: '/research/engine',
					component: 'researchEngine',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'designStage',
					url: '/research/stage',
					component: 'designStage',
					resolve: {authenticate: authenticate}
				},
				{
					name: 'default',
					url: '*path',
					component: 'home'
				}
			];

			states.forEach(function(state) {
				$stateProvider.state(state);
			});
		});

	function authenticate($q, $state, $timeout) {
		var user = firebase.auth().currentUser;

		if (user) {
			return $q.when();
		} else {
			
			$timeout(function() {

				$state.go('login');
			});

			return $q.reject();
		}
	}


	angular
		.module('spaceyyz')
		.run(['$state', function($state) {
			$state.defaultErrorHandler(function() {});
		}]);
				   
})();
