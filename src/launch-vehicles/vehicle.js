/* VehicleList is a component that represents a list of vehicles that 
 * can be filtered, for easy reuse across different pages.
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleList', {
			templateUrl: 'src/launch-vehicles/vehicle.html',
			controller: Vehicle,
			bindings: {
				vehicles: '<',
			}
		});

	function Vehicle() {
		this.searchType = 'name';
		this.search_name = '';
		this.search_payload = 10000;
		var self = this;

		this.search = function(type) {
			if (type === 'name') {
				return function(vehicle) {
					return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
				};
			} else if (type === 'capacity') {
				return function(vehicle) {
					return vehicle.variant.capacity >= self.search_payload;
				};
			}
		}
	}
})();
