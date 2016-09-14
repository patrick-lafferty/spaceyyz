(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleList', {
			templateUrl: 'launch-vehicles/vehicle.html',
			controller: Vehicle,
			bindings: {
				vehicles: '<'
			}
		});

	function Vehicle() {
	}
})();
