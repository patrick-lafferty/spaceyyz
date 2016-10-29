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

		function checkLaunchStatus() {
			if (self.flight.launch.date <= Date.now) {
				self.flight.launched = true;
			}
		}

		if (typeof this.flight.mission === "undefined") {
			//possibly refreshed the page, see if we can pull up the order from the db
			flightFactory.getFlight($stateParams.missionName).then(function (flight) {
				self.flight = flight;
				
				self.flight.launched = false;
				checkLaunchStatus();

				$timeout(function() {
					$scope.$apply();
				});
			});
		} else {
			self.flight.launched = false;
			checkLaunchStatus();
		}

	}

})();
