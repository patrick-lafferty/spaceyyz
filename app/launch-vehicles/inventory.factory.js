(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('vehicleInventoryFactory', InventoryFactory);

	function InventoryFactory($http) {

		function minimumCapacity(capacity) {
			return function(vehicle) {
				return vehicle.capacity >= capacity;
			};
		}

		function maximumCapacity(capacity) {
			return function(vehicle) {
				return vehicle.capacity < capacity;
			};
		}

		function capacityBetween(minimum, maximum) {
			return function(vehicle) {
				return vehicle.capacity >= minimum && vehicle.capacity < maximum;
			};
		}

		function sortByCapacity(a, b) {
			return b.capacity - a.capacity;
		}

		function getVehicles(c) {
			var gv = {};

			$http.get('vehicles.json').then(function(response) {
				var vehicles = response.data;
				gv.vehicles = vehicles;
				gv.smallVehicles = vehicles.filter(maximumCapacity(2000)).sort(sortByCapacity);
				gv.mediumVehicles = vehicles.filter(capacityBetween(2000, 20000)).sort(sortByCapacity);
				gv.heavyVehicles = vehicles.filter(capacityBetween(20000, 50000)).sort(sortByCapacity);
				gv.superHeavyVehicles = vehicles.filter(minimumCapacity(50000)).sort(sortByCapacity);
				c(gv);
			});

		}

		function updateVehicle(vehicle)
		{
			//$http.post('vehicles.json', vehicle);
		}

		return {
			//vehicles: getVehicles();
			getVehicles: getVehicles,
			updateVehicle: updateVehicle
		}

	}
})();
