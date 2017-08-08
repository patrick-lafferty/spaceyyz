/* VehicleInventory is the component for the Inventory page. It lists all of the completed owned vehicles
 * */
import angular from 'angular';

class VehicleInventory {
    static get $inject() {
        return ['vehicleInventoryService', '$timeout', '$scope'];
    }

    constructor(vehicleInventoryService, $timeout, $scope) {

        this.searchType = 'name';
        this.search_name = '';
        this.search_payload = 0;

        Promise
            .all([vehicleInventoryService.getVehicles()])
            .then(results => {
                var vehicles = results[0];
                this.smallVehicles = vehicles.smallVehicles;
                this.mediumVehicles = vehicles.mediumVehicles;
                this.heavyVehicles = vehicles.mediumVehicles;
                this.superHeavyVehicles = vehicles.superHeavyVehicles;

                $timeout(() => $scope.$apply());
            });
    }
}

const vehicleInventory = angular
    .module('spaceyyz.launchVehicles.vehicleInventory', [])
    .component('vehicleInventory', {
        templateUrl: 'src/launch-vehicles/inventory.html',
        controller: VehicleInventory
    })
    .name;

export default vehicleInventory;
