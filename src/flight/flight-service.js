import angular from 'angular';

class FlightService {

    static get $inject() {
        return ['spaceportService'];
    }

    constructor(spaceportService) {
        this.spaceportService = spaceportService;

        //this.removeAllFlights();
    }

    scheduleFlight(flight, spaceport) {
        flight.mission.destination.primary = flight.mission.destination.primary.name;
        flight.mission.vehicle = flight.mission.vehicle.key;
        flight.launch.dateTimestamp = flight.launch.date.getTime();

        var key = firebase.database().ref().child('flights').push(flight).key;

        this.spaceportService.scheduleFlight(spaceport, key);
    }

    getFlights() {
        return firebase.database().ref().child('flights').once('value').then(
            snapshot => {
                const flightObject = snapshot.val();
                let flights = [];

                if (flightObject != null) {
                    Object.keys(flightObject).forEach(key => {
                        let flight = flightObject[key];
                        flight.key = key;
                        flight.launch.date = new Date(flight.launch.dateTimestamp);
                        //flight.mission.name = flight.mission.id;
                        flights.push(flight);
                    });
                }

                return flights;
            });
    }

    getFlight(missionName) {

        return this.getFlights().then(flights => flights.find(flight => flight.mission.name === missionName));
    }

    removeAllFlights() {
        firebase.database().ref().child('flights').remove();
        console.log("[flight service] Removed all flights");
    }
}

const flightService = angular
    .module('spaceyyz.flight.service', [])
    .service('flightService', FlightService)
    .name;

export default flightService;