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
			return vehicle.capacity >= Number(self.payload);
		};

		this.vehicles = {all: []};
		this.selectedVehicle = {};
		this.datePicker = {
			isOpen: false
		};

		this.flight = {
			launchDate: new Date()
		}

		this.datePickerOptions = {
			minDate: new Date()
		};
		
		function notifyChanges() {
			$timeout(function() {
				$scope.$apply();
			});
		}

		this.selected = function() {
			if (self.selectedVehicle.inventory === 0) {
				self.datePickerOptions.minDate.setFullYear(new Date().getFullYear() + 1);

				if (self.flight.launchDate < self.datePickerOptions.minDate) {
					self.flight.launchDate = self.datePickerOptions.minDate;
				}
			}
		};

		vehicleInventoryFactory.getVehicles().then(function (vehicles) {
			self.vehicles.all = vehicles.vehicles;

			self.vehicles.all.forEach(function (vehicle) {
				vehicle.selected = false;
			});

			notifyChanges();

		});

	}
})();
