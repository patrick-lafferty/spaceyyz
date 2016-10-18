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
			$uibModal, $state) {

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
				backdrop: 'static',
				resolve: {
					vehicle: function() {
						return self.vehicle;
					}
				}
			
			});

			self.modalInstance.result.then(function(thing) {
				firebase.database().ref().child("orders/nextId").transaction(
					function (currentValue) {
						var next = (currentValue || 0) + 1;
						var order = {
							number: next,
							deliveryDate: 'tomorrow'
						};

						$state.go('orderConfirmation', {orderNumber: next, order: order});

						return next;
				});
			});

		};
	}
})();
