/* OrderDeleteModal is the controller for the modal that pops up
 * when the user clicks on the order delete button on an order's confirmation
 * page.
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderDeleteModal', {
			controller: OrderDeleteModal,
			templateUrl: 'launch-vehicles/order-delete-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	OrderDeleteModal.$inject = ['$scope', '$timeout', '$stateParams'];
	function OrderDeleteModal($scope, $timeout, $stateParams) {
		var self = this;

		this.order = this.resolve.order;
		this.costToCancel = (function() {
			var timestampNow = new Date().getTime();

			var t = timestampNow - self.order.orderTimestamp;
			var progress = t / (self.order.deliveryTimestamp - self.order.orderTimestamp);
			return self.order.cost * progress;
				
		})();
		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close({name: 0});
		};

	}
})();
