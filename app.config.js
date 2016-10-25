/*
 * Set up all of the state routing and authentication
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.config(function ($stateProvider) {
			var states = [ 
				{
					name: 'home',
					url: '/home',
					component: 'home',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'about',
					url: '/about',
					component: 'about'
				},
				{
					name: 'orderNew',
					url: '/launchVehicles/orderNew',
					component: 'orderLaunchVehicle',
					params: {
						redirectTo: 'home'
					},
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'vehicleOrderDetail',
					url: '/launchVehicles/orderNew/:name',
					component: 'vehicleOrderDetail',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'orderConfirmation',
					url: '/launchVehicles/order/:orderNumber',
					component: 'orderConfirmation',
					params: {
						order: {},
						hiddenParam: 'YES'
					},
					//data: {rule: authenticate2}
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'development',
					url: '/launchVehicles/development',
					component: 'vehicleDevelopment',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'completed',
					url: '/launchVehicles/inventory',
					component: 'vehicleInventory',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'config',
					url: '/launchVehicles/config',
					component: 'configVehicle',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'schedule',
					url: '/flight/schedule',
					component: 'scheduleFlight',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'progress',
					url: '/flight/progress',
					component: 'flightProgress',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'northAmericanSpaceports',
					url: '/spaceports/north-america',
					component: 'spaceports',
					resolve: {
						location: function(){return 'north america';},
						//authenticate: authenticate
					}
				},
				{
					name: 'europeanSpaceports',
					url: '/spaceports/europe',
					component: 'spaceports',
					resolve: {
						location: function(){return 'europe';},
						//authenticate: authenticate
					}
				},
				{
					name: 'asianSpaceports',
					url: '/spaceports/asia',
					component: 'spaceports',
					resolve: {
						location: function(){return 'asia';},
						//authenticate: authenticate
					}
				},
				{
					name: 'researchEngine',
					url: '/research/engine',
					component: 'researchEngine',
					//resolve: {authenticate: authenticate}
				},
				{
					name: 'designStage',
					url: '/research/stage',
					component: 'designStage',
					//resolve: {authenticate: authenticate}
				}
				/*{
					name: 'default',
					url: '*path',
					component: 'home'
				}*/
			];

			/*states.forEach(function(state) {
				$stateProvider.state(state);
			});*/
			var authState = {
				name: 'auth',
				template: '<ui-view></ui-view>'
			};

			$stateProvider.state(authState);
			states.forEach(function(state) {
				state.parent = authState;
				state.name = 'auth.' + state.name;
				//authState.state(state);
				$stateProvider.state(state);
			});
				$stateProvider.state({
					name: 'login',
					url: '/login',
					component: 'login',
					params: {
						redirectTo: 'home'
					},
					//resolve: {authenticate: authenticate}
				});

		});

	function authenticate($q, $state, $timeout, $stateParams) {
		var user = firebase.auth().currentUser;

		return $q.when();

		if (user) {
			return $q.when();
		} else {
			/*
			 * user can be undefined if they're logged in but refreshed the page
			 * check to see if firebase saved a token to indicate that they
			 * will be automatically signed in
			 */
			for(var key in localStorage) {
				if (key.startsWith("firebase:authUser"))
				{
					return $q.when();
				}
			}
			
			$timeout(function() {
				$state.go('login', {'redirectTo': $state.current.name});
			});

			return $q.reject();
		}
	}

	angular
		.module('spaceyyz')
		.run(function($uiRouter) {
			var vis = window['ui-router-visualizer'];
			vis.visualizer($uiRouter);
		});


	angular
		.module('spaceyyz')
		.run(['$state', '$transitions', '$timeout', function($state, $transitions, $timeout) {
			//$state.defaultErrorHandler(function() {});

			$transitions.onBefore({to: 'login'}, function (trans) {
				console.log("allowing transition to login");
				return true;
			});
			$transitions.onBefore({to: 'auth.**'}, function(trans) {
				var user = firebase.auth().currentUser;

				if (user) {
					console.log("logged in, allowing transition");
					return true;
				} else {
					/*
					 * user can be undefined if they're logged in but refreshed the page
					 * check to see if firebase saved a token to indicate that they
					 * will be automatically signed in
					 */
					for(var key in localStorage) {
						if (key.startsWith("firebase:authUser"))
						{
							console.log("found key, allowing transition");
							return true;
						}
					}

					var to = trans.$to().name;

					return trans.router.stateService.target('login', {redirectTo: to});
				}
			});

		}]);
				   
})();
