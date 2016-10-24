/* OrderVehicleModal is the controller for the modal that pops up
 * when the user clicks on the order button on a vehicle's information
 * page.
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('orderVehicleModal', {
			controller: OrderVehicleModal,
			templateUrl: 'launch-vehicles/order-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	function OrderVehicleModal(vehicleInventoryFactory, 
			$scope, $timeout, $stateParams) {

		this.vehicle = this.resolve.vehicle;
		var self = this;

		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close({name: 0});
		};

	}
})();
