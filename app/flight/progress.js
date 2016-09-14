(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('flightProgress', {
			templateUrl: 'flight/progress.html',
			controller: FlightProgress
		});

	function FlightProgress() {
	}
})();
