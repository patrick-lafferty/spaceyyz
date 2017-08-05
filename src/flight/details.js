(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('flightDetails', {
			templateUrl: 'src/flight/details.html',
			controller: FlightDetails
		});

	FlightDetails.$inject = ['$stateParams', 'flightFactory', '$timeout', '$scope'];
	function FlightDetails($stateParams, flightFactory, $timeout, $scope) {
		var self = this;
		this.flight = $stateParams.flight;
		this.playbackSpeed = 'Realtime';

		function checkLaunchStatus() {
			if (self.flight.launch.date <= Date.now) {
				self.flight.launched = true;
			}

			self.flight.status = {
				velocity: 0,
				altitude: 0
			};
		}

		if (typeof this.flight.mission === 'undefined') {
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

		let path = document.getElementById('ascentPath');
		let point = document.getElementById('point');

		let svg = document.querySelector('svg');
		let p = svg.createSVGPoint();

		path.addEventListener('mousedown', function (event) {
			p.x = event.clientX;
			p.y = event.clientY;
			let f = p.matrixTransform(svg.getScreenCTM().inverse());
	
			point.setAttribute('cx', f.x);
			point.setAttribute('cy', f.y);

			console.log(f.x + ', ' + f.y);
		});

		self.animLength = 5.0;
		//liftoff, maxq, stage 1 sep, fairing sep, stage 2 shutdown
		let lengths = [0.022, 0.167, 0.4, 0.55, 0.954];
		this.changePlaybackSpeed = function () {
			switch(self.playbackSpeed) {
				case 'Realtime': {
					self.animLength = 600;
					break;
				}
				case '10x': {
					self.animLength = 60;
					break;
				}
			}

			document.querySelectorAll('circle.futureFlightEvent').forEach(function (e, i) {
				e.style.setProperty('animation-delay', lengths[i] * self.animLength + 's');
			});
			document.querySelectorAll('text.futureFlightEvent').forEach(function (e, i) {
				e.style.setProperty('animation-delay', lengths[i] * self.animLength + 's');
			});

			path.style.setProperty('animation-duration', self.animLength + 's');
		};

		this.changePlaybackSpeed();

		let intervalId = window.setInterval(tick, 1000);

		self.events = [
			['Ignition', 'Liftoff', 'Roll program'],
			['Maximum Dynamic Pressure'],
			['Stage 1 Sep', 'Stage 2 Ignition'],
			['Fairing sep'],
			['Stage 2 shutdown']
		];

		this.elapsedTime = 0;
		this.maxFlightTime = 600;
		
		function getStage() {
			let stage = 0;

			for (let i = 0; i < lengths.length; i++) {
				if (self.elapsedTime >= lengths[i] * self.maxFlightTime) {
					stage++;
				} else {
					break;
				}
			}

			return stage;
		}

		self.currentStage = -1;
		function tick() {
			if (self.elapsedTime >= self.maxFlightTime) {
				window.clearInterval(intervalId);
			}

			self.elapsedTime += (self.maxFlightTime / self.animLength);
			self.flight.status.velocity = 40 * self.elapsedTime;
			self.flight.status.altitude++; 

			let stage = getStage();
			if (stage > self.currentStage) {
				self.currentStage = stage;
				self.flight.log = [];
			
				for (let i = 0; i < stage; i++) {
					for (let j = 0; j < self.events[i].length; j++) {
						self.flight.log.push(self.events[i][j]);
					}
				}
				
			}

			$timeout(function () {$scope.$apply();});
		}
	}

})();
