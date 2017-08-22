import angular from 'angular';

class Spaceport {
    constructor(name, country, continent) {
        Object.assign(this, {name, country, continent});

        this.scheduledFlights = [];
        this.pastFlights = [];
    }
}

class SpaceportService {

    constructor() {
        //this.setupSpaceports();
    }

    setupSpaceports() {
        firebase.database().ref().child('spaceports').remove();
        console.log('[spaceport service] Removed all spaceports');

        let spaceports = [
            new Spaceport('Kennedy', 'United States', 'northAmerica'),
        ];

        spaceports.forEach(spaceport => this.addSpaceport(spaceport));
    }

    getSpaceports() {
        return firebase.database().ref().child('spaceports').once('value')
            .then(snapshot => {
                let spaceportObject = snapshot.val();
                let spaceports = [];
                let all = [];

                Object.keys(spaceportObject).forEach(key => {
                    let continent = [];

                    Object.keys(spaceportObject[key]).forEach(k => {
                        var spaceport = spaceportObject[key][k];
                        spaceport.key = k;
                        spaceport.continent = key;

                        if (spaceport.scheduledFlights === undefined) {
                            spaceport.scheduledFlights = [];
                        }

                        if (spaceport.pastFlights === undefined) {
                            spaceport.pastFlights = [];
                        }

                        continent.push(spaceport);
                        all.push(spaceport);
                    });

                    spaceports[key] = continent;
                });

                spaceports.all = all;

                return spaceports;
            });
    }

    addSpaceport(spaceport) {
        var key = firebase.database().ref().child('spaceports/' + spaceport.continent).push({
            name: spaceport.name,
            country: spaceport.country,
            scheduledFlights: [],
            pastFlights: []
        }).key;
        spaceport.key = key;
    }

    scheduleFlight(spaceport, key) {

        spaceport.scheduledFlights.push(key);
        this.updateSpaceport(spaceport);
    }

    updateSpaceport(spaceport) {
        firebase.database().ref().child('spaceports/' + spaceport.continent + '/' + spaceport.key).set({
            name: spaceport.name,
            country: spaceport.country,
            scheduledFlights: spaceport.scheduledFlights,
            pastFlights: spaceport.pastFlights
        });
    }

    deleteSpaceport(spaceport) {
        firebase.database().ref().child('spaceports/' + spaceport.continent + '/' + spaceport.key).remove();
    }

}

const spaceportService = angular
    .module('spaceyyz.spaceports.spaceportService', [])
    .service('spaceportService', SpaceportService)
    .name;

export default spaceportService;