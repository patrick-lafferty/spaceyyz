/*
 * ConfigVehicle is the component for Config page. Its used to add/modify/delete launch
 * vehicles from the database
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('configVehicle', {
			templateUrl: 'src/launch-vehicles/config.html',
			controller: Config,
		});

	Config.$inject = ['vehicleInventoryFactory', '$scope', '$timeout', '$uibModal', 'engineFactory', 'variantFactory'];
	function Config(vehicleInventoryFactory, $scope, $timeout, $uibModal, engineFactory, variantFactory) {

		var self = this;
		this.vehicles = {
			all: [],
		};

		this.engines = [];

		this.newVehicle = {variants: []};
		this.variants = [];
		this.search_name = "";
		this.search = function(vehicle) {
			return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
		};

		this.editVehicle = function(vehicle) {
			vehicle.beingEdited = true;
		};

		this.cancelEditVehicle = function(vehicle) {
			vehicle.beingEdited = false;
		};

		this.saveVehicle = function(vehicle) {
			vehicle.beingEdited = false;
			vehicleInventoryFactory.updateVehicle(vehicle);

			var index = self.vehicles.all.findIndex(function(v) { return v.name === vehicle.name;});

			self.vehicles.all[index] = vehicle;
		};

		self.modalInstance = {};
		this.deleteVehicle = function (vehicle) {
			self.modalInstance = $uibModal.open({
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

			self.modalInstance.result.then(function (vehicle) {
				vehicleInventoryFactory.deleteVehicle(vehicle);
				
				self.vehicles.all.splice(self.vehicles.all.indexOf(vehicle), 1);
			});

		};

		this.createVehicle = function(vehicle) {
			//vehicle.variants = self.variants;
			vehicleInventoryFactory.addVehicle(vehicle);
			self.vehicles.all.push(vehicle);
			self.newVehicle = {variants: []};
			self.variants = [];
		};

		this.addNewVariant = function (vehicle) {
			//self.variants.push({
			vehicle.variants.push({
				name: "Unnamed",
				stages: []
			});
		};

		this.removeVariant = function (index, vehicle) {
			vehicle.variants.splice(index, 1);
		};			

		this.addNewStage = function (variant) {
			variant.stages.push({
				engines: [],
				selectedEngine: {}
			});
		};

		this.removeStage = function (index, variant) {
			variant.stages.splice(index, 1);
		};

		this.addEngine = function (engine, stage) {
			if (typeof engine.name === "undefined") {
				return;
			}

			stage.engines.push(engine);
		};

		this.removeEngine = function (index, stage) {
			stage.engines.splice(index, 1);
		};

		/*
		 * vehicles/engines/variants are stored separately in the database, so we need to combine them all here to display
		 * */
		Promise.all([
			vehicleInventoryFactory.getVehicles(),
			engineFactory.getEngines(),
			variantFactory.getFamilies()])
		.then(function (results) {
			self.vehicles.all = results[0].vehicles;
			self.engines = results[1];

			var variants = results[2];

			variants.forEach(function (family) {
				var vehicle;
				for(var i = 0; i < self.vehicles.all.length; i++) {
					if (self.vehicles.all[i].familyKey === family.key) {
						vehicle = self.vehicles.all[i];
						break;
					}
				}	

				vehicle.variants = family.variants;

				vehicle.variants.forEach(function (variant) {
					variant.stages.forEach(function (stage) {
						stage.engines = stage.engines.map(function (engineKey) {
							var engine;
							self.engines.forEach(function (e) {
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
})();
