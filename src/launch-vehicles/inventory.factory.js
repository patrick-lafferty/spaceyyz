/*
 * VehicleInventoryFactory handles all things vehicular. It manages accessing/modifying vehicles stored in firebase
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('vehicleInventoryFactory', InventoryFactory);

	InventoryFactory.$inject = ['variantFactory'];
	function InventoryFactory(variantFactory) {

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

		function getVehicles() {

			return firebase.database().ref().child("vehicles").once('value').then(function(snapshot) {

				var gv = {};
				var vehicleObject = snapshot.val();
				var vehicles = [];
				Object.keys(vehicleObject).forEach(function (key) {
					var object = vehicleObject[key];
					object.key = key;
					object.nameWithoutSpaces = object.name.replace(/\s+/g, "-");
					vehicles.push(object);
				});

				return getInventory().then(function (inventory) {
					inventory.forEach(function (vehicle) {
						vehicles.forEach(function(v) {
							if (v.key === vehicle.key) {
								v.inventory = vehicle.count;
							}
						});
					});

					gv.vehicles = vehicles;
					gv.smallVehicles = vehicles.filter(maximumCapacity(2000)).sort(sortByCapacity);
					gv.mediumVehicles = vehicles.filter(capacityBetween(2000, 20000)).sort(sortByCapacity);
					gv.heavyVehicles = vehicles.filter(capacityBetween(20000, 50000)).sort(sortByCapacity);
					gv.superHeavyVehicles = vehicles.filter(minimumCapacity(50000)).sort(sortByCapacity);

					return gv;
				});

			});
		}

		function getVehicle(name, then) {
			getVehicles().then(function(vehicles) {
				then(vehicles.vehicles.filter(function(vehicle) {
					return vehicle.nameWithoutSpaces == name;
				})[0]);
			});
		}

		function getInventory() {
			return firebase.database().ref().child("inventory").once('value').then(function(snapshot) {
				var inventoryObject = snapshot.val();

				var inventory = [];

				Object.keys(inventoryObject).forEach(function (key) {
					var object = inventoryObject[key];
					object.key = key;
					inventory.push(object);
				});

				return inventory;
			});
		}

		function addVehicle(vehicle) {
			var key = firebase.database().ref().child("vehicles").push().key;
			var updates = {};

			var inventory = {
				count: 0
			};

			var familyKey = firebase.database().ref().child("variants").push().key;

			//updates["/vehicles/" + key] = vehicle;
			updates["/vehicles/" + key] = {
				name: vehicle.name,
				description: vehicle.description,
				familyKey: familyKey
			};

			vehicle.familyKey = familyKey;

			updates["/inventory/" + key] = inventory;

			firebase.database().ref().update(updates);

			vehicle.variants.forEach(function (variant) {
				variantFactory.addVariant(variant, familyKey);
			});
		}

		function updateVehicle(vehicle)
		{
			firebase.database().ref().child("vehicles/" + vehicle.key).set({
				//capacity: vehicle.capacity,
				//cost: vehicle.cost,
				name: vehicle.name,
				description: vehicle.description,
				familyKey: vehicle.familyKey
			});

			variantFactory.replaceVariants(vehicle.familyKey, vehicle.variants);
		}

		function deleteVehicle(vehicle)
		{
			firebase.database().ref().child("vehicles/" + vehicle.key).remove();

			firebase.database().ref().child("variants/" + vehicle.familyKey).remove();
		}

		return {
			getVehicle: getVehicle,
			getVehicles: getVehicles,
			getInventory: getInventory,
			updateVehicle: updateVehicle,
			deleteVehicle: deleteVehicle,
			addVehicle: addVehicle
		}

	}
})();
