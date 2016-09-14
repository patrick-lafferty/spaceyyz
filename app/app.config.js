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
					url: '/launchVehicles/completed',
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
			];

			states.forEach(function(state) {
				$stateProvider.state(state);
			});
		});
				   
})();
