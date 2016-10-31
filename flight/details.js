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
		this.playbackSpeed = "Realtime";

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

		var path = document.getElementById("ascentPath");
		var point = document.getElementById("point");

		var svg = document.querySelector("svg");
		var p = svg.createSVGPoint();

		path.addEventListener("mousedown", function (event) {
			//console.log(event.x + ", " + event.y);
			p.x = event.clientX;
			p.y = event.clientY;
			var f = p.matrixTransform(svg.getScreenCTM().inverse());
	
			point.setAttribute("cx", f.x);
			point.setAttribute("cy", f.y);

			console.log(f.x + ", " + f.y);
		});

		

		self.animLength = 5.0;
		var lengths = [0.022, 0.167, 0.4, 0.55, 0.954];
		this.changePlaybackSpeed = function () {
			switch(self.playbackSpeed) {
				case "Realtime": {
					self.animLength = 600;
					break;
				}
				case "10x": {
					self.animLength = 60;
					break;
				}
			}

			document.querySelectorAll("circle.futureFlightEvent").forEach(function (e, i) {
				e.style.setProperty('animation-delay', lengths[i] * self.animLength + 's');
			});
			document.querySelectorAll("text.futureFlightEvent").forEach(function (e, i) {
				e.style.setProperty('animation-delay', lengths[i] * self.animLength + 's');
			});

			path.style.setProperty('animation-duration', self.animLength + 's');
		};

		this.changePlaybackSpeed();
	}

})();
