import angular from 'angular';

class FlightProgress {

	  static get $inject() {
        return ['flightService', '$timeout', '$scope'];
    }
    
    constructor(flightService, $timeout, $scope) {

        this.flights = [];

        flightService.getFlights().then(flights => {
            this.flights = flights;
            $timeout(() => $scope.$apply());
        });
    }
}

const flightProgress = angular
      .module('spaceyyz.flight.progress', [])
		  .component('flightProgress', {
			    templateUrl: 'src/flight/progress.html',
			    controller: FlightProgress
		  })
      .name;

export default flightProgress;
