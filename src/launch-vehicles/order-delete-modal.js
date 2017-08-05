/* OrderDeleteModal is the controller for the modal that pops up
 * when the user clicks on the order delete button on an order's confirmation
 * page.
 * */
import angular from 'angular';

class OrderDeleteModal {

	static get $inject() {
		return ['$scope', '$timeout', '$stateParams'];
	}

	constructor($scope, $timeout, $stateParams) {
		this.order = this.resolve.order;
		this.costToCancel = (function() {
			var timestampNow = new Date().getTime();

			var t = timestampNow - this.order.orderTimestamp;
			var progress = t / (this.order.deliveryTimestamp - this.order.orderTimestamp);
			return this.order.cost * progress;
				
		})();
	}

	cancel() {
		this.modalInstance.dismiss('cancel');
	}

	confirm() {
		this.modalInstance.close({name: 0});
	}
}

const orderDeleteModal = angular
	.module('spaceyyz.launchVehicles.orderDeleteModal', [])
	.component('orderDeleteModal', {
		controller: OrderDeleteModal,
		templateUrl: 'src/launch-vehicles/order-delete-modal.html',
		bindings: {
			resolve: '<',
			modalInstance: '<'
		}
	})
	.name;	

export default orderDeleteModal;