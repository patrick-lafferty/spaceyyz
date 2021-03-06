/* VehicleList is a component that represents a list of vehicles that 
 * can be filtered, for easy reuse across different pages.
 * */
import angular from 'angular';

class Vehicle {
    constructor() {
        this.searchType = 'name';
        this.search_name = '';
        this.search_payload = 10000;
    }

    search(type) {
        if (type === 'name') {
            return vehicle => {
                let searchNameLowerCase = this.search_name.toLowerCase();
                
                return vehicle.name.toLowerCase().includes(searchNameLowerCase)
                    || vehicle.variant.name.toLowerCase().includes(searchNameLowerCase);
            };
        } else if (type === 'capacity') {
            return vehicle => vehicle.variant.capacity >= this.search_payload;
        }
    }
}

const vehicle = angular
    .module('spaceyyz.launchVehicles.vehicle', [])
    .component('vehicleList', {
        templateUrl: 'src/launch-vehicles/vehicle.html',
        controller: Vehicle,
        bindings: {
            vehicles: '<',
        }
    })
    .name;

export default vehicle;
