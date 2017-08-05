/* OrderDeleteModal is the controller for the modal that pops up
 * when the user clicks on the order delete button on an order's confirmation
 * page.
 * */
import angular from 'angular';

class OrderDeleteModal {

	$onInit() {
		this.order = this.resolve.order;

		const timestampNow = new Date().getTime();
		const t = timestampNow - this.order.orderTimestamp;
		const progress = t / (this.order.deliveryTimestamp - this.order.orderTimestamp);
				
		this.costToCancel = this.order.cost * progress;
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