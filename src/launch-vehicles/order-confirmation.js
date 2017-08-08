/* OrderConfirmation is the component for displaying a specific vehicle order's confirmation details
 * */
import angular from 'angular';

class OrderConfirmation {

    static get $inject() {
        return ['orderService', '$uibModal', '$scope', '$timeout', '$state', '$stateParams'];
    }

    constructor(orderService, $uibModal, $scope, $timeout, $state, $stateParams) {
        Object.assign(this, {
            orderService,
            $uibModal,
            $scope,
            $timeout,
            $state,
            $stateParams
        });
        this.order = $stateParams.order;

        if (this.order.number === undefined) {
            //possibly refreshed the page, see if we can pull up the order from the db
            orderService.getOrder(Number($stateParams.orderNumber)).then(order => {
                this.order = order;

                $timeout(() => this.$scope.$apply());
            });
        }

        this.modalInstance = {};
    }

    cancelOrder() {
        this.modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'launch-vehicles/order-delete-modal.html',
            component: 'orderDeleteModal',
            backdrop: 'static',
            resolve: {
                order: () => this.order
            }
        });

        this.modalInstance.result.then(thing => {
            this.orderService.deleteOrder(this.order);
            this.$state.go('development');
        });
    }
}

const orderConfirmation = angular
    .module('spaceyyz.launchVehicles.orderConfirmation', [])
    .component('orderConfirmation', {
        templateUrl: 'src/launch-vehicles/order-confirmation.html',
        controller: OrderConfirmation,
    })
    .name;

export default orderConfirmation;
