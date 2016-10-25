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
				},
				{
					name: 'vehicleOrderDetail',
					url: '/launchVehicles/orderNew/:name',
					component: 'vehicleOrderDetail',
				},
				{
					name: 'orderConfirmation',
					url: '/launchVehicles/order/:orderNumber',
					component: 'orderConfirmation',
					params: {
						order: {},
						hiddenParam: 'YES'
					},
				},
				{
					name: 'development',
					url: '/launchVehicles/development',
					component: 'vehicleDevelopment',
				},
				{
					name: 'completed',
					url: '/launchVehicles/inventory',
					component: 'vehicleInventory',
				},
				{
					name: 'config',
					url: '/launchVehicles/config',
					component: 'configVehicle',
				},
				{
					name: 'schedule',
					url: '/flight/schedule',
					component: 'scheduleFlight',
				},
				{
					name: 'progress',
					url: '/flight/progress',
					component: 'flightProgress',
				},
				{
					name: 'northAmericanSpaceports',
					url: '/spaceports/north-america',
					component: 'spaceports',
					resolve: {
						location: function(){return 'north america';},
					}
				},
				{
					name: 'europeanSpaceports',
					url: '/spaceports/europe',
					component: 'spaceports',
					resolve: {
						location: function(){return 'europe';},
					}
				},
				{
					name: 'asianSpaceports',
					url: '/spaceports/asia',
					component: 'spaceports',
					resolve: {
						location: function(){return 'asia';},
					}
				},
				{
					name: 'researchEngine',
					url: '/research/engine',
					component: 'researchEngine',
				},
				{
					name: 'designStage',
					url: '/research/stage',
					component: 'designStage',
				}
				/*{
					name: 'default',
					url: '*path',
					component: 'home'
				}*/
			];

			var authState = {
				name: 'auth',
				template: '<ui-view></ui-view>'
			};

			$stateProvider.state(authState);
			states.forEach(function(state) {
				state.parent = authState;
				state.name = 'auth.' + state.name;
				$stateProvider.state(state);
			});
				$stateProvider.state({
					name: 'login',
					url: '/login',
					component: 'login',
					params: {
						redirectTo: 'auth.home'
					},
				});

		});

	/*angular
		.module('spaceyyz')
		.run(function($uiRouter) {
			var vis = window['ui-router-visualizer'];
			vis.visualizer($uiRouter);
		});*/


	angular
		.module('spaceyyz')
		.run(['$state', '$transitions', '$timeout', function($state, $transitions, $timeout) {
			//$state.defaultErrorHandler(function() {});

			$transitions.onBefore({to: 'login'}, function (trans) {

				var user = firebase.auth().currentUser;
				if (user) { 
					return trans.router.stateService.target('auth.home');
				}

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

					return trans.router.stateService.target('login', {redirectTo: to}, {reload: true});
				}
			});

		}]);
				   
})();
