(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('flightProgress', {
			templateUrl: 'flight/progress.html',
			controller: FlightProgress
		});

	FlightProgress.$inject = ['flightFactory', '$timeout', '$scope'];
	function FlightProgress(flightFactory, $timeout, $scope) {

		var self = this;
		this.flights = [];

		flightFactory.getFlights().then(function (flights) {
			self.flights = flights;

			$timeout(function () { $scope.$apply();});
		});
	}
})();
