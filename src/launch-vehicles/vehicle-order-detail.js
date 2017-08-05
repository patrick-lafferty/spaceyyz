/* VehicleOrderDetail is the component for the individual vehicle pages
 * where the user can view the vehicle's details and order it.
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleOrderDetail', {
			templateUrl: 'src/launch-vehicles/vehicle-order-detail.html',
			controller: VehicleOrderDetail 
		});	

	VehicleOrderDetail.$inject = ['vehicleInventoryFactory',
		'$scope', '$timeout', '$stateParams',
		'$uibModal', '$state', 'orderFactory', 'variantFactory'];
	function VehicleOrderDetail(vehicleInventoryFactory, 
		$scope, $timeout, $stateParams,
		$uibModal, $state, orderFactory, variantFactory) {

		this.vehicle = {};
		let self = this;

		Promise
			.all([
				vehicleInventoryFactory.getVehicle($stateParams.name),
				variantFactory.getFamilies()])
			.then(function (results) {
				self.vehicle = results[0];
				let families = results[1];

				for(let i = 0; i < families.length; i++) {
					if (families[i].key === self.vehicle.familyKey) {
						self.vehicle.variants = families[i].variants;
						break;
					}
				}

				$timeout(function () {
					$scope.$apply();
				});

			});

		self.modalInstance = {};
		this.open = function(variant) {
			self.modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'launch-vehicles/order-modal.html',
				component: 'orderVehicleModal',
				backdrop: 'static',
				resolve: {
					//needs to be variant not vehicle
					vehicle: function() {
						return self.vehicle;
					},
					variant: function () {
						return variant;
					}
				}
			
			});

			self.modalInstance.result.then(function(variant) {

				let deliveryDate = new Date(); 
				deliveryDate.setFullYear(new Date().getFullYear() + 1);

				let order = {
					orderTimestamp: new Date().getTime(),
					deliveryDate: deliveryDate,
					vehicleName: self.vehicle.name,
					variantName: variant.name,
					cost: variant.cost
				};

				orderFactory.getNewOrderNumber().then(function(snapshot) {
					let orderNumber = snapshot.snapshot.val();
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
