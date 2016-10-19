(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('confirmVehicleDeleteModal', {
			controller: ConfirmVehicleDeleteModal,
			templateUrl: 'launch-vehicles/config-confirm-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	function ConfirmVehicleDeleteModal(vehicleInventoryFactory, 
			$scope, $timeout, $stateParams) {

		this.vehicle = this.resolve.vehicle;
		var self = this;

		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close(self.vehicle);
		};

	}
})();
