import angular from 'angular';

class SpaceportService {

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
            country: spaceport.country
        }).key;
        spaceport.key = key;
    }

    updateSpaceport(spaceport) {
        firebase.database().ref().child('spaceports/' + spaceport.continent + '/' + spaceport.key).set({
            name: spaceport.name,
            country: spaceport.country
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