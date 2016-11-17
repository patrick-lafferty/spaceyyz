/* OrderLaunchVehicle is the component for the Order New page.
 * It lists all of the vehicles currently configured in the database that
 * can be purchased by the user. It allows filtering by name or payload, 
 * and sorting alphabetically if filtering by name, or sorting by payload capacity
 * if filtering by payload.
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderLaunchVehicle', {
			templateUrl: 'launch-vehicles/order-new.html',
			controller: OrderLaunchVehicle 
		});	

	OrderLaunchVehicle.$inject = ['vehicleInventoryFactory', '$scope', '$timeout'];
	function OrderLaunchVehicle(vehicleInventoryFactory, $scope, $timeout) {
		this.primaries = [
			{name: "Earth", satellites: ["None", "Moon"], selectedSatellite: "None"},
			{name: "Mars", satellites: ["None", "Phobos", "Deimos"], selectedSatellite: "None"}
		];

		this.vehicles = {
			all: [],
			small: [],
			medium: [],
			heavy: [],
			superHeavy: []
		}

		this.selectedPrimary = this.primaries[0];
		this.search_name = "";
		this.search_payload = 10000;
		var self = this;

		vehicleInventoryFactory.getVehicles().then(set);
		vehicleInventoryFactory.getInventory().then(setInventory);

		function set(vehicles) {
			self.vehicles.all = vehicles.vehicles;
			self.vehicles.small = vehicles.smallVehicles;
			self.vehicles.medium = vehicles.mediumVehicles;
			self.vehicles.heavy = vehicles.heavyVehicles;
			self.vehicles.superHeavy = vehicles.superHeavyVehicles;

			$timeout(function() {
				$scope.$apply();
			});
		}
		
		function setInventory(inventory) {
			self.inventory = inventory;
		}

		this.search = function(type) {
			if (type === "name") {
				return function(vehicle) {
					return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
				};
			} else if (type === "capacity") {
				return function(vehicle) {
					return vehicle.capacity >= self.search_payload;
				};
			}
		}

	}
})();
