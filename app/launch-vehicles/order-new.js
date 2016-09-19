(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderLaunchVehicle', {
			templateUrl: 'launch-vehicles/order-new.html',
			controller: OrderLaunchVehicle 
		});	

	function OrderLaunchVehicle(vehicleInventoryFactory) {
		this.primaries = [
			{name: "Earth", satellites: ["None", "Moon"], selectedSatellite: "None"},
			{name: "Mars", satellites: ["None", "Phobos", "Deimos"], selectedSatellite: "None"}
		];
		this.vehicles = [];

		this.selectedPrimary = this.primaries[0];
		this.search_name = "";
		this.search_payload = 10000;
		var self = this;

		vehicleInventoryFactory.getVehicles(set);
		vehicleInventoryFactory.getInventory(setInventory);

		function set(vehicles) {
			self.vehicles = vehicles.vehicles;
			self.smallVehicles = vehicles.smallVehicles;
			self.mediumVehicles = vehicles.mediumVehicles;
			self.heavyVehicles = vehicles.heavyVehicles;
			self.superHeavyVehicles = vehicles.superHeavyVehicles;
		}
		
		function setInventory(inventory) {
			self.inventory = inventory;
		}

		this.search = function(type) {
			if (type === "Name") {
				return function(vehicle) {
					return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
				};
			} else if (type === "Payload") {
				return function(vehicle) {
					return vehicle.capacity >= self.search_payload;
				};
			} else {
				alert(type + " shouldn't get here");
			}
		}

		this.order = function(vehicle) {
			//alert("ordering a new " + vehicle.name);
			//var v = { count: 0};
			var inv = this.inventory.find(function(v) {return v.key === vehicle.key;});
			inv.count++;
			vehicleInventoryFactory.updateVehicle(inv);
		}
	}
})();
