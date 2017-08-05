/* OrderConfirmation is the component for displaying a specific vehicle order's confirmation details
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderConfirmation', {
			templateUrl: 'src/launch-vehicles/order-confirmation.html',
			controller: OrderConfirmation,
		});	

	OrderConfirmation.$inject = ['orderFactory', '$uibModal', 
		'$scope', '$timeout', '$state', '$stateParams'];
	function OrderConfirmation(orderFactory, $uibModal,
		$scope, $timeout, $state, $stateParams) {

		var self = this;
		this.order = $stateParams.order;

		if (typeof this.order.number === 'undefined') {
			//possibly refreshed the page, see if we can pull up the order from the db
			orderFactory.getOrder(Number($stateParams.orderNumber)).then(function (order) {
				self.order = order;
				
				$timeout(function() {
					$scope.$apply();
				});
			});
		}

		this.modalInstance = {};
		this.cancelOrder = function() {
			self.modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'launch-vehicles/order-delete-modal.html',
				component: 'orderDeleteModal',
				backdrop: 'static',
				resolve: {
					order: function() {
						return self.order;
					}
				}
			
			});

			self.modalInstance.result.then(function(thing) {

				orderFactory.deleteOrder(self.order);
				$state.go('development');
			});
		};

	}
})();

