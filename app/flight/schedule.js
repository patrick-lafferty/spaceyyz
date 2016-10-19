(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('scheduleFlight', {
			templateUrl: 'flight/schedule.html',
			controller: ScheduleFlight
		});

	function ScheduleFlight(vehicleInventoryFactory, $timeout, $scope) {
		this.payload = 0;

		var self = this;

		this.filter = function(vehicle) {
			//alert(typeof self.payload);
			return vehicle.capacity >= Number(self.payload);
		};

		this.vehicles = {all: []};
		this.selectedVehicle = {};
		this.datePicker = {
			isOpen: false
		};

		vehicleInventoryFactory.getVehicles().then(function (vehicles) {
			self.vehicles.all = vehicles.vehicles;

			self.vehicles.all.forEach(function (vehicle) {
				vehicle.selected = false;
			});

			$timeout(function() {
				$scope.$apply();
			});
		});

	}
})();
