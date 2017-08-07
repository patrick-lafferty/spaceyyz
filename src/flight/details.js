import angular from 'angular';

class FlightDetails {

	  static get $inject() {
        return ['$stateParams', 'flightService', '$timeout', '$scope'];
    }
    
    checkLaunchStatus() {
        if (this.flight.launch === undefined || this.flight.launch.date <= Date.now) {
            this.flight.launched = true;
        }

        this.flight.status = {
            velocity: 0,
            altitude: 0
        };
    }
    
    constructor($stateParams, flightService, $timeout, $scope) {
        Object.assign(this, {$stateParams, flightService, $timeout, $scope});
        this.flight = $stateParams.flight;
        this.playbackSpeed = 'Realtime';
		    this.events = [
			      ['Ignition', 'Liftoff', 'Roll program'],
			      ['Maximum Dynamic Pressure'],
			      ['Stage 1 Sep', 'Stage 2 Ignition'],
			      ['Fairing sep'],
			      ['Stage 2 shutdown']
		    ];

		    this.elapsedTime = 0;
		    this.maxFlightTime = 600;
		    this.currentStage = -1;
        this.animLength = 5.0;
        //liftoff, maxq, stage 1 sep, fairing sep, stage 2 shutdown
        this.lengths = [0.022, 0.167, 0.4, 0.55, 0.954];
        
        this.changePlaybackSpeed = () => {
            switch(this.playbackSpeed) {
            case 'Realtime': {
                this.animLength = 600;
                break;
            }
            case '10x': 
            default: {
                this.animLength = 60;
                break;
            }
            }

            document.querySelectorAll('circle.futureFlightEvent').forEach((e, i) => {
                e.style.setProperty('animation-delay', this.lengths[i] * this.animLength + 's');
            });
            document.querySelectorAll('text.futureFlightEvent').forEach((e, i) => {
                e.style.setProperty('animation-delay', this.lengths[i] * this.animLength + 's');
            });

            let path = document.getElementById('ascentPath');
            path.style.setProperty('animation-duration', this.animLength + 's');
        };

        if (this.flight.mission === undefined) {
            //possibly refreshed the page, see if we can pull up the order from the db
            flightService.getFlight(this.$stateParams.missionName).then(flight => {
                this.flight = flight;
                this.flight.launched = false;
                this.setup();

                $timeout(() => this.$scope.$apply());
            });
        } else {
            this.flight.launched = false;
            this.setup();
        }
    }

    setup() {
        this.checkLaunchStatus();
        this.setupPath();
		    this.changePlaybackSpeed();
		    this.intervalId = window.setInterval(() => this.tick(), 1000);
    }

    setupPath() {

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
        });
    }

		getStage() {
			let stage = 0;

			for (let i = 0; i < this.lengths.length; i++) {
				if (this.elapsedTime >= this.lengths[i] * this.maxFlightTime) {
					stage++;
				} else {
					break;
				}
			}

			return stage;
		}

		tick() {
			if (this.elapsedTime >= this.maxFlightTime) {
				window.clearInterval(this.intervalId);
			}

			this.elapsedTime += (this.maxFlightTime / this.animLength);
			this.flight.status.velocity = 40 * this.elapsedTime;
			this.flight.status.altitude++; 

			let stage = this.getStage();
			if (stage > this.currentStage) {
				this.currentStage = stage;
				this.flight.log = [];
			
				for (let i = 0; i < stage; i++) {
					for (let j = 0; j < this.events[i].length; j++) {
						this.flight.log.push(this.events[i][j]);
					}
				}
				
			}

			this.$timeout(() => this.$scope.$apply());
		}
}


const flightDetails =	angular
      .module('spaceyyz.flight.flightDetails', [])
		  .component('flightDetails', {
			    templateUrl: 'src/flight/details.html',
			    controller: FlightDetails
		  })
      .name;

export default flightDetails;
