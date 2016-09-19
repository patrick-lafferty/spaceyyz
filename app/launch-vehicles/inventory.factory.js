(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('vehicleInventoryFactory', InventoryFactory);

	function InventoryFactory() {

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

		/*function getVehicles(c) {
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

		}*/
		function getVehicles(c) {
			var gv = {};

			firebase.database().ref().child("vehicles").once('value').then(function(snapshot) {

				var vehicleObject = snapshot.val();
				var vehicles = [];
				Object.keys(vehicleObject).forEach(function (key) {
					var object = vehicleObject[key];
					object.key = key;
					vehicles.push(object);
				});

				gv.vehicles = vehicles;
				gv.smallVehicles = vehicles.filter(maximumCapacity(2000)).sort(sortByCapacity);
				gv.mediumVehicles = vehicles.filter(capacityBetween(2000, 20000)).sort(sortByCapacity);
				gv.heavyVehicles = vehicles.filter(capacityBetween(20000, 50000)).sort(sortByCapacity);
				gv.superHeavyVehicles = vehicles.filter(minimumCapacity(50000)).sort(sortByCapacity);

				c(gv);
			});
		}

		function getInventory(then) {
			firebase.database().ref().child("inventory").once('value').then(function(snapshot) {
				var inventoryObject = snapshot.val();

				var inventory = [];

				Object.keys(inventoryObject).forEach(function (key) {
					var object = inventoryObject[key];
					object.key = key;
					inventory.push(object);
				});

				then(inventory);
			});
		}

		function addVehicle(vehicle) {
			var key = firebase.database().ref().child("vehicles").push().key;
			var updates = {};

			var inventory = {
				count: 1
			};

			updates["/vehicles/" + key] = vehicle;
			updates["/inventory/" + key] = inventory;

			firebase.database().ref().update(updates);
		}

		setupDB();
		function setupDB() {


		}

		function updateVehicle(vehicle)
		{
			//$http.post('vehicles.json', vehicle);
			firebase.database().ref().child("inventory/" + vehicle.key).update({
				count: vehicle.count 
			});
		}

		return {
			//vehicles: getVehicles();
			getVehicles: getVehicles,
			getInventory: getInventory,
			updateVehicle: updateVehicle
		}

	}
})();
