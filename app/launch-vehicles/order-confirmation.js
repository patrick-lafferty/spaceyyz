(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderConfirmation', {
			templateUrl: 'launch-vehicles/order-confirmation.html',
			controller: OrderConfirmation,
			/*bindings: {
				order: '<'
			}*/
		});	

	function OrderConfirmation(vehicleInventoryFactory, 
			$scope, $timeout, $stateParams) {

		var self = this;
		this.order = $stateParams.order;

	}
})();

