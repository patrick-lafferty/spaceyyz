(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('configVehicle', {
			templateUrl: 'launch-vehicles/config.html',
			controller: Config
		});

	function Config(vehicleInventoryFactory, $scope, $timeout) {

		var self = this;
		this.vehicles = {
			all: [],
		};

		this.search_name = "";
		this.search = function(vehicle) {
			return vehicle.name.toLowerCase().includes(self.search_name.toLowerCase());
		};

		this.editVehicle = function(vehicle) {
			vehicle.beingEdited = true;
		};

		this.saveVehicle = function(vehicle) {
			vehicle.beingEdited = false;
		};

		vehicleInventoryFactory.getVehicles(set);

		function set(vehicles) {
			self.vehicles.all = vehicles.vehicles;

			$timeout(function() {
				$scope.$apply();
			});
		}
	}
})();
