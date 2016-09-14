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
				name: "SLS",
				capacity: 50000
			},
			{
				name: "falcon",
				capacity: 2000
			}
		];

		this.minimumCapacity = function(capacity) {
			return function(vehicle) {
				return vehicle.capacity >= capacity;
			};
		};

		this.capacityBetween = function(minimum, maximum) {
			return function(vehicle) {
				return vehicle.capacity >= minimum && vehicle.capacity < maximum;
			};
		}
	}
})();
