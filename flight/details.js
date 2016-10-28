(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('flightDetails', {
			templateUrl: 'flight/details.html',
			controller: FlightDetails
		});

	function FlightDetails($stateParams, flightFactory, $timeout, $scope) {
		var self = this;
		this.flight = $stateParams.flight;

		if (typeof this.flight.mission === "undefined") {
			//possibly refreshed the page, see if we can pull up the order from the db
			flightFactory.getFlight($stateParams.missionName).then(function (flight) {
				self.flight = flight;
				
				$timeout(function() {
					$scope.$apply();
				});
			});
		}

	}

})();
