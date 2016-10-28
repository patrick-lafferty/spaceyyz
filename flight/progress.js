(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('flightProgress', {
			templateUrl: 'flight/progress.html',
			controller: FlightProgress
		});

	function FlightProgress(flightFactory, $timeout, $scope) {

		var self = this;
		this.flights = [];

		flightFactory.getFlights().then(function (flights) {
			self.flights = flights;

			$timeout(function () { $scope.$apply();});
		});
	}
})();
