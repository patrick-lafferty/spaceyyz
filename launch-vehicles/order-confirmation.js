/* OrderConfirmation is the component for displaying a specific vehicle order's confirmation details
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderConfirmation', {
			templateUrl: 'launch-vehicles/order-confirmation.html',
			controller: OrderConfirmation,
		});	

	function OrderConfirmation(orderFactory, 
			$scope, $timeout, $stateParams) {

		var self = this;
		this.order = $stateParams.order;

		if (typeof this.order.number === "undefined") {
			//possibly refreshed the page, see if we can pull up the order from the db
			orderFactory.getOrder(Number($stateParams.orderNumber)).then(function (order) {
				self.order = order;
				
				$timeout(function() {
					$scope.$apply();
				});
			});
		}

	}
})();

