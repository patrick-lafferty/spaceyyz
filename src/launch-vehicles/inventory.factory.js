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
			return b.variant.capacity - a.variant.capacity;
		}

		function combineVehiclesWithVariants(vehicles, variants) {
			variants.forEach(function (family) {
				let vehicle = {};

				for(let i = 0; i < vehicles.length; i++) {
					if (vehicles[i].familyKey === family.key) {
						vehicle = vehicles[i];
						break;
					}
				}

				vehicle.variants = family.variants;
			});
		}

		function CategorizedVehicle(vehicle, variant) {
			return {
				name: vehicle.name,
				nameWithoutSpaces: vehicle.nameWithoutSpaces,
				description: vehicle.description,
				key: vehicle.key,
				familyKey: vehicle.familyKey,
				variant: variant
			}
		}

		function categorizeVehicles(vehicles) {
			var vehicleCategories = Object.create(null);
			vehicleCategories.smallVehicles = [];
			vehicleCategories.mediumVehicles = [];
			vehicleCategories.heavyVehicles = [];
			vehicleCategories.superHeavyVehicles = [];

			vehicles.forEach(function (vehicle) {
				vehicle.variants.forEach(function (variant) {
					if (maximumCapacity(2000)(variant)) {
						vehicleCategories.smallVehicles.push(new CategorizedVehicle(vehicle, variant));
					} else if (capacityBetween(2000, 20000)(variant)) {
						vehicleCategories.mediumVehicles.push(new CategorizedVehicle(vehicle, variant));
					} else if (capacityBetween(20000, 50000)(variant)) {
						vehicleCategories.heavyVehicles.push(new CategorizedVehicle(vehicle, variant));
					} else if (minimumCapacity(50000)(variant)) {
						vehicleCategories.superHeavyVehicles.push(new CategorizedVehicle(vehicle, variant));
					}
				});
			});


			Object.keys(vehicleCategories).forEach(function (key) {
				vehicleCategories[key].sort(sortByCapacity);
			});

			vehicleCategories.allVehicles = vehicles;
			
			return vehicleCategories;
		}

		function getVehicles() {

			return Promise
				.all([

					firebase.database().ref().child('vehicles').once('value'),
					getInventory(),
					variantFactory.getFamilies()
				])
				.then(function (results) {

					var vehicleObject = results[0].val();
					var vehicles = [];
					var vehicleMap = Object.create(null);

					Object.keys(vehicleObject).forEach(function (key) {
						var object = vehicleObject[key];
						object.key = key;
						object.nameWithoutSpaces = object.name.replace(/\s+/g, '-');
						vehicles.push(object);
						vehicleMap[object.key] = object;

					});

					combineVehiclesWithVariants(vehicles, results[2]);

					let inventory = results[1];

					inventory.forEach(function (vehicleInventory) {
						Object.keys(vehicleInventory).forEach(function (key) {
							let variant = vehicleInventory[key];
							let variants = vehicleMap[vehicleInventory.key].variants;
							for(let i = 0; i < variants.length; i++) {
								if (variants[i].key === key) {
									variants[i].count = variant.count;
									break;
								}
							}
						});
					});

					return categorizeVehicles(vehicles);
				});

		}

		function getVehicle(name) {
			return getVehicles().then(function (vehicles) {
				for (let i = 0; i < vehicles.allVehicles.length; i++)  {
					if (vehicles.allVehicles[i].nameWithoutSpaces == name) {
						return vehicles.allVehicles[i];
					}
				}
			});
		}

		function getInventory() {
			return firebase.database().ref().child('inventory').once('value').then(function(snapshot) {
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
			var key = firebase.database().ref().child('vehicles').push().key;
			var updates = {};

			var inventory = {
				//count: 0
			};

			var familyKey = firebase.database().ref().child('variants').push().key;

			//updates['/vehicles/' + key] = vehicle;
			updates['/vehicles/' + key] = {
				name: vehicle.name,
				description: vehicle.description,
				familyKey: familyKey
			};

			vehicle.familyKey = familyKey;

			vehicle.variants.forEach(function (variant) {
				variantFactory.addVariant(variant, familyKey);
				inventory[variant.key] = { 
					count: 0
				};
			});

			updates['/inventory/' + key] = inventory;
			firebase.database().ref().update(updates);
		}

		function updateVehicle(vehicle)
		{
			firebase.database().ref().child('vehicles/' + vehicle.key).set({
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
			firebase.database().ref().child('vehicles/' + vehicle.key).remove();

			firebase.database().ref().child('variants/' + vehicle.familyKey).remove();
		}

		return {
			getVehicle: getVehicle,
			getVehicles: getVehicles,
			getInventory: getInventory,
			updateVehicle: updateVehicle,
			deleteVehicle: deleteVehicle,
			addVehicle: addVehicle,
			combineVehiclesWithVariants: combineVehiclesWithVariants,
			categorizeVehicles: categorizeVehicles
		}

	}
})();
