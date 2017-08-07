import angular from 'angular';

class FlightProgress {

	  static get $inject() {
        return ['flightFactory', '$timeout', '$scope'];
    }
    
    constructor(flightFactory, $timeout, $scope) {

        this.flights = [];

        flightFactory.getFlights().then(flights => {
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
