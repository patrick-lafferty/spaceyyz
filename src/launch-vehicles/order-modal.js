/* OrderVehicleModal is the controller for the modal that pops up
 * when the user clicks on the order button on a vehicle's information
 * page.
 * */
import angular from 'angular';

class OrderVehicleModal {

    $onInit() {
        this.vehicle = this.resolve.vehicle;
        this.variant = this.resolve.variant;
    }

    cancel() {
        this.modalInstance.dismiss('cancel');
    }

    confirm() {
        this.modalInstance.close(this.variant);
    }
}

const orderVehicleModal = angular
    .module('spaceyyz.launchVehicles.orderModal', [])
    .component('orderVehicleModal', {
        controller: OrderVehicleModal,
        templateUrl: 'src/launch-vehicles/order-modal.html',
        bindings: {
            resolve: '<',
            modalInstance: '<'
        }
    })
    .name;

export default orderVehicleModal;
