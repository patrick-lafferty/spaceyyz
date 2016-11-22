/*
 * ConfirmVehicleDeleteModal is a component for a modal that pops up when
 * the user tries to delete a vehicle in the Config page
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('confirmVehicleDeleteModal', {
			controller: ConfirmVehicleDeleteModal,
			templateUrl: 'src/launch-vehicles/config-confirm-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	ConfirmVehicleDeleteModal.$inject = ['vehicleInventoryFactory',
		'$scope', '$timeout', '$stateParams'];
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
