/*
 * Set up all of the state routing and authentication
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.config(['$stateProvider', function ($stateProvider) {
			var states = [ 
				{
					name: 'home',
					url: '/home',
					component: 'home',
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
					name: 'flightDetails',
					url: '/flight/details/:missionName',
					component: 'flightDetails',
					params: {
						flight: {},
						hiddenParam: 'YES'
					},
				},
				/*{
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
				},*/
				{
					name: 'spaceportStatus',
					url: '/spaceports/status',
					component: 'spaceportStatus',
					params: {
						continent: {},
						hiddenParam: 'YES'
					},
				},
				{
					name: 'configureSpaceport',
					url: '/spaceports/configure',
					component: 'configureSpaceport'
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

			var nonAuthStates = [
				{
					name: 'about',
					url: '/about',
					component: 'about'
				},
				{
					name: 'login',
					url: '/login',
					component: 'login',
					params: {
						redirectTo: 'home'
					},
				}
			];

			var authState = {
				name: 'auth',
				template: '<ui-view></ui-view>'
			};

			$stateProvider.state(authState);
			states.forEach(function(state) {
				state.parent = authState;
				//state.name = 'auth.' + state.name;
				$stateProvider.state(state);
			});
			
			nonAuthStates.forEach(function (state) {
				$stateProvider.state(state);
			});

		}]);

	/*angular
		.module('spaceyyz')
		.run(function($uiRouter) {
			var vis = window['ui-router-visualizer'];
			vis.visualizer($uiRouter);
		});*/


	angular
		.module('spaceyyz')
		.run(['$state', '$transitions', function($state, $transitions) {
			//$state.defaultErrorHandler(function() {});

			$transitions.onBefore({to: 'login'}, function (trans) {

				var user = firebase.auth().currentUser;
				if (user) { 
					return trans.router.stateService.target('home');
				}

				return true;
			});
			/*$transitions.onBefore({to: '*'}, function (trans) {
				console.log(trans.$to().name);
			});*/
			$transitions.onBefore({to: function(state) {
				return state.parent.name == "auth";
			}}, /*function (trans) {
				console.log(trans.$to().name);
			});

			$transitions.onBefore({to: 'auth.**'},*/ function(trans) {
				var user = firebase.auth().currentUser;

				if (user) {
					return true;
				} else {
					/*
					 * user can be undefined if they're logged in but refreshed the page
					 * check to see if firebase saved a token to indicate that they
					 * will be automatically signed in
					 */
					for(const key in localStorage) {
						if (key.startsWith('firebase:authUser'))
						{
							return true;
						}
					}

					return trans.router.stateService.target('login', {redirectTo: trans.$to().name}, {reload: true});
				}
			});

		}]);
})();
