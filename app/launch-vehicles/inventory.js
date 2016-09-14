(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleInventory', {
			templateUrl: 'launch-vehicles/inventory.html',
			controller: Inventory
		});

	function Inventory() {
		this.vehicles = [
			{
				name: "SLS Block 2",
				capacity: 130000,
				inventory: 1
			},
			{
				name: "SLS Block 1B",
				capacity: 70000,
				inventory: 1
			},
			{
				name: "Delta IV Heavy",
				capacity: 28000,
				inventory: 1
			},
			{
				name: "falcon",
				capacity: 2000,
				inventory: 10
			}
		];

		this.smallVehicles = this.vehicles.filter(maximumCapacity(2000)).sort(sortByCapacity);
		this.mediumVehicles = this.vehicles.filter(capacityBetween(2000, 20000)).sort(sortByCapacity);
		this.heavyVehicles = this.vehicles.filter(capacityBetween(20000, 50000)).sort(sortByCapacity);
		this.superHeavyVehicles= this.vehicles.filter(minimumCapacity(50000)).sort(sortByCapacity);

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

	}
})();
