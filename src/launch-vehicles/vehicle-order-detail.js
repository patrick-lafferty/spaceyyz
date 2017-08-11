/* VehicleOrderDetail is the component for the individual vehicle pages
 * where the user can view the vehicle's details and order it.
 * */
import angular from 'angular';

class VehicleOrderDetail {
    static get $inject() {
        return ['vehicleInventoryService',
            '$scope', '$timeout', '$stateParams',
            '$uibModal', '$state', 'orderService', 'variantService'
        ];
    }

    constructor(vehicleInventoryService,
        $scope, $timeout, $stateParams,
        $uibModal, $state, orderService, variantService) {

        Object.assign(this, {
            vehicleInventoryService,
            $scope,
            $timeout,
            $stateParams,
            $uibModal,
            $state,
            orderService,
            variantService
        });

        this.vehicle = {};

        Promise
            .all([
                vehicleInventoryService.getVehicle($stateParams.name),
                variantService.getFamilies()
            ])
            .then(results => {
                this.vehicle = results[0];
                let families = results[1];

                let variants = families.find(family => family.key === this.vehicle.familyKey);

                if (variants !== undefined) {
                    this.vehicle.variants = variants;
                }

                $timeout(function() {
                    $scope.$apply();
                });

            });

        this.modalInstance = {};
    }

    open(variant) {
        this.modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'launch-vehicles/order-modal.html',
            component: 'orderVehicleModal',
            backdrop: 'static',
            resolve: {
                vehicle: () => this.vehicle,
                variant: () => variant
            }
        });

        this.modalInstance.result.then(variant => {

            let deliveryDate = new Date();
            deliveryDate.setFullYear(new Date().getFullYear() + 1);

            let order = {
                orderTimestamp: new Date().getTime(),
                deliveryDate: deliveryDate,
                vehicleName: this.vehicle.name,
                variantName: variant.name,
                cost: variant.cost
            };

            this.orderService.getNewOrderNumber().then(snapshot => {
                let orderNumber = snapshot.snapshot.val();
                order.number = orderNumber;
                this.orderService.addOrder(order);

                this.$state.go('orderConfirmation', {
                    orderNumber: orderNumber,
                    order: order
                });
            }, function(/*error*/) {
                //console.error(error);
            });
        });

    }
}

const vehicleOrderDetail = angular
    .module('spaceyyz.launchVehicles.vehicleOrderDetail', [])
    .component('vehicleOrderDetail', {
        templateUrl: 'src/launch-vehicles/vehicle-order-detail.html',
        controller: VehicleOrderDetail
    })
    .name;

export default vehicleOrderDetail;
