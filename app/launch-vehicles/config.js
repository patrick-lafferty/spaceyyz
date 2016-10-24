/*
 * ConfigVehicle is the component for Config page. Its used to add/modify/delete launch
 * vehicles from the database
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('configVehicle', {
			templateUrl: 'launch-vehicles/config.html',
			controller: Config
		});

	function Config(vehicleInventoryFactory, $scope, $timeout, $uibModal) {

		var self = this;
		this.vehicles = {
			all: [],
		};

		this.newVehicle = {};
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
			vehicleInventoryFactory.addVehicle(vehicle);
			self.vehicles.all.push(vehicle);
			self.newVehicle = {};
		};

		vehicleInventoryFactory.getVehicles().then(function (vehicles) {
			self.vehicles.all = vehicles.vehicles;

			$timeout(function() {
				$scope.$apply();
			});
		});

	}
})();
