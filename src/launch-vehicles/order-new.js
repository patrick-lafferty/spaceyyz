/* OrderLaunchVehicle is the component for the Order New page.
 * It lists all of the vehicles currently configured in the database that
 * can be purchased by the user. It allows filtering by name or payload, 
 * and sorting alphabetically if filtering by name, or sorting by payload capacity
 * if filtering by payload.
 * */
import angular from 'angular';

class OrderLaunchVehicle {

	static get $inject() {
		return ['vehicleInventoryFactory', '$scope', '$timeout', 'variantFactory'];
	}

	constructor(vehicleInventoryFactory, $scope, $timeout, variantFactory) {
		Object.assign(this, {vehicleInventoryFactory, $scope, $timeout, variantFactory});

		this.primaries = [
			{name: 'Earth', satellites: ['None', 'Moon'], selectedSatellite: 'None'},
			{name: 'Mars', satellites: ['None', 'Phobos', 'Deimos'], selectedSatellite: 'None'}
		];

		this.vehicles = {
			all: [],
			small: [],
			medium: [],
			heavy: [],
			superHeavy: []
		};

		this.selectedPrimary = this.primaries[0];
		this.search_name = '';
		this.search_payload = 10000;

		this.variantFilter = variant => {
			if (this.searchType === 'capacity') {
				return variant.capacity >= this.search_payload;
			}

			return true;
		};

		vehicleInventoryFactory.getInventory().then(result => this.setInventory(result));

		Promise
			.all([
				vehicleInventoryFactory.getVehicles(),
				variantFactory.getFamilies()])
			.then(results => {
				this.set(results[0]);

				let variants = results[1];

				variants.forEach(family => {
					let vehicle = this.vehicles.all.find(vehicle =>vehicle.familyKey === family.key);

					if (vehicle !== undefined) {
						vehicle.variants = family.variants;
					}
				});

				$timeout(() => this.$scope.$apply());
			});
	}

	set(vehicles) {
		this.vehicles.all = vehicles.allVehicles;
		this.vehicles.small = vehicles.smallVehicles;
		this.vehicles.medium = vehicles.mediumVehicles;
		this.vehicles.heavy = vehicles.heavyVehicles;
		this.vehicles.superHeavy = vehicles.superHeavyVehicles;
	}
		
	setInventory(inventory) {
		this.inventory = inventory;
	}

	search(type) {
		if (type === 'name') {
			return vehicle => vehicle.name.toLowerCase().includes(this.search_name.toLowerCase());
		} else if (type === 'capacity') {
			return vehicle => vehicle.variants.some(variant => variant.capacity >= this.search_payload);
		}
	}

	
}

const orderNew = angular
		.module('spaceyyz.launchVehicles.orderNew', [])
		.component('orderLaunchVehicle', {
			templateUrl: 'src/launch-vehicles/order-new.html',
			controller: OrderLaunchVehicle 
		})
		.name;	
	
export default orderNew;