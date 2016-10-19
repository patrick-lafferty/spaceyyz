(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleList', {
			templateUrl: 'launch-vehicles/vehicle.html',
			controller: Vehicle,
			bindings: {
				vehicles: '<',
			}
		});

	function Vehicle() {
		this.searchType = "name";
		this.search_name = "";
		this.search_payload = 10000;
		var self = this;

		this.search = function(type) {
			if (type === "name") {
				return function(vehicle) {
					return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
				};
			} else if (type === "capacity") {
				return function(vehicle) {
					return vehicle.capacity >= self.search_payload;
				};
			} else {
				alert(type + " shouldn't get here");
			}
		}
	}
})();
