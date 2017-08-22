import angular from 'angular';

class Spaceports {

    static get $inject() {
        return ['spaceportService', '$timeout', '$scope', 'flightService'];
    }

    constructor(spaceportService, $timeout, $scope, flightService) {
        this.spaceports = {};

        Promise.all([spaceportService.getSpaceports(),
            flightService.getFlights()
        ]).then(results => {
            this.spaceports = results[0];
            const flights = results[1];
            const now = new Date();
            const millisecondsPerDay = 1000 * 60 * 60 * 24;

            this.spaceports.all.forEach(spaceport => {
                spaceport.scheduledFlights = spaceport.scheduledFlights.map(key => {
                    let flight = flights.find(flight => flight.key === key);

                    flight.launch.tminus = (now - flight.launch.date) / millisecondsPerDay;

                    return flight;
                });
            });

            $timeout(() => $scope.$apply());
        });
    }
}

const spaceport = angular
    .module('spaceyyz.spaceports.spaceport', [])
    .component('spaceportStatus', {
        templateUrl: 'src/spaceports/spaceport-status.html',
        controller: Spaceports,
    })
    .name;

export default spaceport;