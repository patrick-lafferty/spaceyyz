(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('flightFactory', FlightFactory);

	function FlightFactory() {
		var self = this;

		this.scheduleFlight = function (flight) {
			flight.mission.destination.primary = flight.mission.destination.primary.name;
			flight.mission.vehicle = flight.mission.vehicle.key;
			flight.launch.dateTimestamp = flight.launch.date.getTime();

			firebase.database().ref().child('flights').push(flight);

		};

		this.getFlights = function () {
			return firebase.database().ref().child('flights').once('value').then(
				function (snapshot) {
					var flightObject = snapshot.val();

					var flights = [];

					Object.keys(flightObject).forEach(function (key) {
						var flight = flightObject[key];
						flight.mission.name = flight.mission.id;
						flights.push(flight);
					});

					return flights;
				});
		};

		this.getFlight = function (missionName) {

			return self.getFlights().then(function (flights) {
				var index = flights.findIndex(function (flight) {
					return flight.mission.name === missionName;
				});

				return flights[index];
			});
		};

		return this;
	}
})();
