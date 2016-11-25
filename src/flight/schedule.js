(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('scheduleFlight', {
			templateUrl: 'src/flight/schedule.html',
			controller: ScheduleFlight
		});

	ScheduleFlight.$inject = ['vehicleInventoryFactory', 'spaceportFactory',
		'$timeout', '$scope', 'groupByFilter', 'solarSystemFactory', 'flightFactory'];
	function ScheduleFlight(vehicleInventoryFactory, spaceportFactory,
			$timeout, $scope, groupByFilter, solarSystemFactory, flightFactory) {
		this.payload = 0;

		var self = this;
		this.solarSystem = solarSystemFactory;

		this.filter = function(vehicle) {
			//return vehicle.capacity >= Number(self.payload);
			return vehicle.variants.some(function (variant) {
				return variant.capacity >= Number(self.payload);
			});
		};

		this.variantFilter = function (variant) {
			return variant.capacity >= Number(self.payload);
		};

		this.vehicles = {all: []};
		this.selectedVehicle = {};
		this.datePicker = {
			isOpen: false
		};

		this.flight = {
			mission: {
				id: "",
				payload: 0,
				destination: {
					primary: self.solarSystem.planets[2],
					secondary: "None"
				},
				type: "orbit",
				vehicle: {}
			},
			launch: {
				date: new Date(),
				site: {}
			}
		};

		this.datePickerOptions = {
			minDate: new Date()
		};

		this.spaceports = {};
		this.continent = "northAmerica";
		this.spaceport = {};
		this.selectedValidSpaceport = false;
		this.filtername = "";
		this.spaceportFilter = function (spaceport) {
			return spaceport.name.toLowerCase().includes(self.filtername.toLowerCase());
		};
		this.isopen = false;
		this.spaceportSelected = function(spaceport) {
			self.spaceport = spaceport;
			self.selectedValidSpaceport = true;
			self.filtername = spaceport.name;
		};
		this.filterChanged = function () {
			self.isopen = true;
			self.spaceport = {};
			self.selectedValidSpaceport = false;
			
			for(var i = 0; i < self.ungroupedSpaceports[self.continent].length; i++) {
				var spaceport = self.ungroupedSpaceports[self.continent][i];

				if (spaceport.name === self.filtername) {
					self.spaceport = spaceport;
					self.selectedValidSpaceport = true;
					break;
				}
			}
		};

		this.schedule = function () {
			self.flight.mission.name = "sts-31";
			flightFactory.scheduleFlight(self.flight);
		};

		this.continentChanged = function () {
			self.filterChanged();
			notifyChanges();
		};
		
		function notifyChanges() {
			$timeout(function() {
				$scope.$apply();
			});
		}

		this.selected = function() {
			self.flight.mission.vehicle = self.selectedVehicle;

			if (self.selectedVehicle.inventory === 0) {
				self.datePickerOptions.minDate.setFullYear(new Date().getFullYear() + 1);

				if (self.flight.launchDate < self.datePickerOptions.minDate) {
					self.flight.launchDate = self.datePickerOptions.minDate;
				}
			}
		};

		vehicleInventoryFactory.getVehicles().then(function (vehicles) {
			self.vehicles.all = vehicles.allVehicles;

			self.vehicles.all.forEach(function (vehicle) {
				vehicle.selected = false;
			});

			notifyChanges();
		});

		spaceportFactory.getSpaceports().then(function (spaceports) {
			self.ungroupedSpaceports = spaceports;
			self.spaceports.northAmerica = groupByFilter(spaceports.northAmerica, 'country');

			notifyChanges();
		});
	}
})();
