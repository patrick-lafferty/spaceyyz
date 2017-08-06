/*
 * VehicleInventoryFactory handles all things vehicular. It manages accessing/modifying vehicles stored in firebase
 * */
import angular from 'angular';

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

class CategorizedVehicle {
	constructor(vehicle, variant) {
		this.name = vehicle.name;
		this.nameWithoutSpaces = vehicle.nameWithoutSpaces;
		this.description = vehicle.description;
		this.key = vehicle.key;
		this.familyKey = vehicle.familyKey;
		this.variant = variant;
	}
}

function categorizeVehicles(vehicles) {
	let vehicleCategories = Object.create(null);
	vehicleCategories.smallVehicles = [];
	vehicleCategories.mediumVehicles = [];
	vehicleCategories.heavyVehicles = [];
	vehicleCategories.superHeavyVehicles = [];

	vehicles.forEach(function (vehicle) {
		if (vehicle.variants) {
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
		}
	});

	Object.keys(vehicleCategories).forEach(function (key) {
		vehicleCategories[key].sort(sortByCapacity);
	});

	vehicleCategories.allVehicles = vehicles;
	
	return vehicleCategories;
}

class InventoryFactory {

	static get $inject() {
		return ['variantFactory'];
	}

	constructor(variantFactory) {
		this.variantFactory = variantFactory;
	}

	combineVehiclesWithVariants(vehicles, variants) {
		variants.forEach(function (family) {
			let vehicle = vehicles.find(vehicle => vehicle.familyKey === family.key);

			if (vehicle !== undefined) {
				vehicle.variants = family.variants;
			}
		});
	}

	getVehicles() {

		return Promise
			.all([
				firebase.database().ref().child('vehicles').once('value'),
				this.getInventory(),
				this.variantFactory.getFamilies()
			])
			.then(results => {

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

				this.combineVehiclesWithVariants(vehicles, results[2]);

				let inventory = results[1];

				inventory.forEach(function (vehicleInventory) {
					Object.keys(vehicleInventory).forEach(function (key) {
						let variant = vehicleInventory[key];
						let variants = vehicleMap[vehicleInventory.key].variants;

						if (variants !== undefined) {
							for(let i = 0; i < variants.length; i++) {
								if (variants[i].key === key) {
									variants[i].count = variant.count;
									break;
								}
							}
						}
					});
				});

				return categorizeVehicles(vehicles);
			});
	}

	getVehicle(name) {
		return this.getVehicles().then(function (vehicles) {
			return vehicles.allVehicles.find(vehicle => vehicle.nameWithoutSpaces === name);
		});
	}

	 getInventory() {
		return firebase.database().ref().child('inventory').once('value').then(function(snapshot) {
			let inventoryObject = snapshot.val();
			let inventory = [];

			Object.keys(inventoryObject).forEach(function (key) {
				let object = inventoryObject[key];
				object.key = key;
				inventory.push(object);
			});

			return inventory;
		});
	}

	addVehicle(vehicle) {
		var key = firebase.database().ref().child('vehicles').push().key;
		var updates = {};

		var inventory = {
			//count: 0
		};

		var familyKey = firebase.database().ref().child('variants').push().key;

		updates['/vehicles/' + key] = {
			name: vehicle.name,
			description: vehicle.description,
			familyKey: familyKey
		};

		vehicle.familyKey = familyKey;

		vehicle.variants.forEach(variant => {
			this.variantFactory.addVariant(variant, familyKey);
			inventory[variant.key] = { 
				count: 0
			};
		});

		updates['/inventory/' + key] = inventory;
		firebase.database().ref().update(updates);
	}

	updateVehicle(vehicle)
	{
		firebase.database().ref().child('vehicles/' + vehicle.key).set({
			name: vehicle.name,
			description: vehicle.description,
			familyKey: vehicle.familyKey
		});

		this.variantFactory.replaceVariants(vehicle.familyKey, vehicle.variants);
	}

	deleteVehicle(vehicle)
	{
		firebase.database().ref().child('vehicles/' + vehicle.key).remove();
		firebase.database().ref().child('variants/' + vehicle.familyKey).remove();
	}
}

const inventoryFactory = angular
		.module('spaceyyz.launchVehicles.inventoryFactory', [])
		.factory('vehicleInventoryFactory', InventoryFactory)
		.name;

export default inventoryFactory;