/* VehicleDevelopment is the component for the In Development page
 * It shows all of the orders currently being processed, with
 * a progress bar showing how many dates into the order they are.
 * */
import angular from 'angular';

class VehicleDevelopment {

    static get $inject() {
        return ['orderService', '$timeout', '$scope'];
    }

    constructor(orderService, $timeout, $scope) {
        this.orders = {
            all: []
        };

        orderService.getOrders().then(orders => {
            this.orders.all = orders;

            let timestampNow = new Date().getTime();

            this.orders.all.forEach(function(order) {
                let t = timestampNow - order.orderTimestamp;
                order.progress = 100 * t / (order.deliveryTimestamp - order.orderTimestamp);
            });

            $timeout(function() {
                $scope.$apply();
            });
        });
    }
}

const vehicleDevelopment = angular
    .module('spaceyyz.launchVehicles.vehicleDevelopment', [])
    .component('vehicleDevelopment', {
        templateUrl: 'src/launch-vehicles/development.html',
        controller: VehicleDevelopment
    })
    .name;

export default vehicleDevelopment;
