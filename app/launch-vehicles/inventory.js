(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleInventory', {
			templateUrl: 'launch-vehicles/inventory.html',
			controller: Inventory
		});

	function Inventory(vehicleInventoryFactory) {
		vehicleInventoryFactory.getVehicles(set);

		var self = this;
		function set(vehicles) {
			self.smallVehicles = vehicles.smallVehicles;
			self.mediumVehicles = vehicles.mediumVehicles;
			self.heavyVehicles = vehicles.heavyVehicles;
			self.superHeavyVehicles = vehicles.superHeavyVehicles;
		}
	}
})();
