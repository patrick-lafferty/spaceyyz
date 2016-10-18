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
			$uibModal, $state, orderFactory) {

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
				/*firebase.database().ref().child("orders/nextId").transaction(
					function (currentValue) {
						var next = (currentValue || 0) + 1;
						var deliveryDate = new Date(); 
						deliveryDate.setFullYear(new Date().getFullYear() + 1);

						var order = {
							number: next,
							deliveryDate: deliveryDate
						};

						orderFactory.addOrder(order);

						$state.go('orderConfirmation', {orderNumber: next, order: order});

						return next;
				});*/

				var deliveryDate = new Date(); 
				deliveryDate.setFullYear(new Date().getFullYear() + 1);

				var order = {
					orderTimestamp: new Date().getTime(),
					deliveryDate: deliveryDate,
					vehicleName: self.vehicle.name
				};

				orderFactory.getNewOrderNumber().then(function(snapshot) {
					var orderNumber = snapshot.snapshot.val();
					order.number = orderNumber;
					orderFactory.addOrder(order);

					$state.go('orderConfirmation', {orderNumber: orderNumber, order: order});
				}, function (error) {
					console.error(error);
				});
			});

		};
	}
})();
