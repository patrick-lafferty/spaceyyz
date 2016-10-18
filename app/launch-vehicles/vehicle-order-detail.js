(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleOrderDetail', {
			templateUrl: 'launch-vehicles/vehicle-order-detail.html',
			controller: VehicleOrderDetail 
		});	

	function VehicleOrderDetail(vehicleInventoryFactory, 
			$scope, $timeout, $stateParams,
			$uibModal) {

		this.vehicle = {};
		var self = this;

		vehicleInventoryFactory.getVehicle($stateParams.name, function(vehicle) {
			self.vehicle = vehicle;

			$timeout(function() {
				$scope.$apply();
			});
		});

		self.modalInstance = {};
		this.open = function() {
			self.modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'launch-vehicles/order-modal.html',
				component: 'orderVehicleModal',
				resolve: {
					vehicle: function() {
						return self.vehicle;
					}
				}
			
			});

		};
	}
})();
