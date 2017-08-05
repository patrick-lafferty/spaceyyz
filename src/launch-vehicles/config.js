/*
 * ConfigVehicle is the component for Config page. Its used to add/modify/delete launch
 * vehicles from the database
 * */
import {PromiseImpl as Promise} from 'firebase';
import angular from 'angular';

class Config {

	constructor(vehicleInventoryFactory, $scope, $timeout, $uibModal, engineFactory, variantFactory) {
		Object.assign(this, {vehicleInventoryFactory, $scope, $timeout, $uibModal, engineFactory, variantFactory});

		this.vehicles = {
			all: [],
		};

		this.engines = [];

		this.newVehicle = {variants: []};
		this.variants = [];
		this.search_name = '';
		this.modalInstance = {};

		/*
		 * vehicles/engines/variants are stored separately in the database, so we need to combine them all here to display
		 * */
		Promise
			.all([
				vehicleInventoryFactory.getVehicles(),
				engineFactory.getEngines(),
				variantFactory.getFamilies()])
			.then((results) => {
				this.vehicles.all = results[0].allVehicles;
				this.engines = results[1];

				let variants = results[2];

				variants.forEach(function (family) {
					let vehicle = undefined;
					for(let i = 0; i < this.vehicles.all.length; i++) {
						if (this.vehicles.all[i].familyKey === family.key) {
							vehicle = this.vehicles.all[i];
							break;
						}
					}	

					vehicle.variants = family.variants;

					vehicle.variants.forEach(function (variant) {
						variant.stages.forEach(function (stage) {
							stage.engines = stage.engines.map(function (engineKey) {
								let engine = undefined;
								this.engines.forEach(function (e) {
									if (e.key === engineKey) {
										engine = e;
									}
								});

								return engine;
							});
						});
					});
				});

				$timeout(function () {
					$scope.$apply();
				});

			});
	}

	static get $inject() {
		return ['vehicleInventoryFactory', '$scope', '$timeout', '$uibModal', 'engineFactory', 'variantFactory'];
	}

	search(vehicle) {
		return vehicle.name.toLowerCase().includes(this.search_name.toLowerCase());
	}

	editVehicle(vehicle) {
		vehicle.beingEdited = true;
	}

	cancelEditVehicle(vehicle) {
		vehicle.beingEdited = false;
	}

	saveVehicle(vehicle) {
		vehicle.beingEdited = false;
		this.vehicleInventoryFactory.updateVehicle(vehicle);

		let index = this.vehicles.all.findIndex(function(v) { return v.name === vehicle.name;});

		this.vehicles.all[index] = vehicle;
	}

	deleteVehicle(vehicle) {
		this.modalInstance = this.$uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			component: 'confirmVehicleDeleteModal',
			backdrop: 'static',
			resolve: {
				vehicle: function() {
					return vehicle;
				}
			}
		
		});

		this.modalInstance.result.then(function (vehicle) {
			this.vehicleInventoryFactory.deleteVehicle(vehicle);
			
			this.vehicles.all.splice(this.vehicles.all.indexOf(vehicle), 1);
		});
	}

	createVehicle(vehicle) {
		this.vehicleInventoryFactory.addVehicle(vehicle);
		this.vehicles.all.push(vehicle);
		this.newVehicle = {variants: []};
		this.variants = [];
	}

	addNewVariant(vehicle) {
		vehicle.variants.push({
			name: 'Unnamed',
			stages: []
		});
	}

	removeVariant(index, vehicle) {
		vehicle.variants.splice(index, 1);
	}			

	addNewStage(variant) {
		variant.stages.push({
			engines: [],
			selectedEngine: {}
		});
	}

	removeStage(index, variant) {
		variant.stages.splice(index, 1);
	}

	addEngine(engine, stage) {
		if (typeof engine.name === 'undefined') {
			return;
		}

		stage.engines.push(engine);
	}

	removeEngine(index, stage) {
		stage.engines.splice(index, 1);
	}
}

const config = angular
	.module('spaceyyz')
	.component('configVehicle', {
		templateUrl: 'src/launch-vehicles/config.html',
		controller: Config,
	})
	.name;

export default config;