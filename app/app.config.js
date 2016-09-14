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
					name: 'vehicles',
					url: '/vehicles',
					component: 'vehicleList'
				}
			];

			states.forEach(function(state) {
				$stateProvider.state(state);
			});
		});
				   
})();
