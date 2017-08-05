/* VehicleInventory is the component for the Inventory page. It lists all of the completed owned vehicles
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleInventory', {
			templateUrl: 'src/launch-vehicles/inventory.html',
			controller: Inventory
		});

	Inventory.$inject = ['vehicleInventoryFactory', '$timeout', '$scope'];
	function Inventory(vehicleInventoryFactory, $timeout, $scope) {

		var self = this;
		this.searchType = 'name';
		this.search_name = '';
		this.search_payload = 0;

		Promise
			.all([vehicleInventoryFactory.getVehicles()])
			.then(function (results) {
				var vehicles = results[0];
				self.smallVehicles = vehicles.smallVehicles;
				self.mediumVehicles = vehicles.mediumVehicles;
				self.heavyVehicles = vehicles.mediumVehicles;
				self.superHeavyVehicles = vehicles.superHeavyVehicles;

				$timeout(function() {$scope.$apply();});
			});
	}
})();
