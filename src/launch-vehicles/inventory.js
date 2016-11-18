/* VehicleInventory is the component for the Inventory page. It lists all of the completed owned vehicles
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleInventory', {
			templateUrl: 'launch-vehicles/inventory.html',
			controller: Inventory
		});

	Inventory.$inject = ['vehicleInventoryFactory', '$timeout', '$scope'];
	function Inventory(vehicleInventoryFactory, $timeout, $scope) {
		vehicleInventoryFactory.getVehicles().then(set);

		this.searchType = "name";
		this.search_name = "";
		this.search_payload = 0;

		var self = this;
		function set(vehicles) {
			self.smallVehicles = vehicles.smallVehicles;
			self.mediumVehicles = vehicles.mediumVehicles;
			self.heavyVehicles = vehicles.heavyVehicles;
			self.superHeavyVehicles = vehicles.superHeavyVehicles;

			$timeout(function() {
				$scope.$apply();
			});
		}
	}
})();
