(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.config(function ($stateProvider) {
			var states = [ 
				{
					name: 'home',
					url: '/',
				},
				{
					name: 'orderNew',
					url: '/launchVehicles/orderNew',
					component: 'orderLaunchVehicle'
				},
				{
					name: 'development',
					url: '/launchVehicles/development',
					component: 'vehicleDevelopment'
				},
				{
					name: 'completed',
					url: '/launchVehicles/inventory',
					component: 'vehicleInventory'
				},
				{
					name: 'schedule',
					url: '/flight/schedule',
					component: 'scheduleFlight'
				},
				{
					name: 'progress',
					url: '/flight/progress',
					component: 'flightProgress'
				},
				{
					name: 'northAmericanSpaceports',
					url: '/spaceports/north-america',
					component: 'spaceports',
					resolve: {
						location: function(){return 'north america';}
					}
				},
				{
					name: 'europeanSpaceports',
					url: '/spaceports/europe',
					component: 'spaceports',
					resolve: {
						location: function(){return 'europe';}
					}
				},
				{
					name: 'asianSpaceports',
					url: '/spaceports/asia',
					component: 'spaceports',
					resolve: {
						location: function(){return 'asia';}
					}
				},
				{
					name: 'researchEngine',
					url: '/research/engine',
					component: 'researchEngine'
				},
				{
					name: 'designStage',
					url: '/researc/stage',
					component: 'designStage'
				},
			];

			states.forEach(function(state) {
				$stateProvider.state(state);
			});
		});
				   
})();
