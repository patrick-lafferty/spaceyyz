import angular from 'angular';

class FlightService {
    
    scheduleFlight(flight) {
      flight.mission.destination.primary = flight.mission.destination.primary.name;
      flight.mission.vehicle = flight.mission.vehicle.key;
      flight.launch.dateTimestamp = flight.launch.date.getTime();

      firebase.database().ref().child('flights').push(flight);

    };

    getFlights() {
      return firebase.database().ref().child('flights').once('value').then(
        snapshot => {
          const flightObject = snapshot.val();
          let flights = [];

          Object.keys(flightObject).forEach(key => {
            let flight = flightObject[key];
            flight.mission.name = flight.mission.id;
            flights.push(flight);
          });

          return flights;
        });
    };

    getFlight(missionName) {

        return this.getFlights().then(flights => flights.find(flight => flight.mission.name === missionName));
    }
  }

const flightService =   angular
      .module('spaceyyz.flight.service', [])
      .service('flightService', FlightService)
      .name;

export default flightService;
