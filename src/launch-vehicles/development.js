/* VehicleDevelopment is the component for the In Development page
 * It shows all of the orders currently being processed, with
 * a progress bar showing how many dates into the order they are.
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleDevelopment', {
			templateUrl: 'src/launch-vehicles/development.html',
			controller: VehicleDevelopment 
		});	

	VehicleDevelopment.$inject = ['orderFactory', '$timeout', '$scope'];
	function VehicleDevelopment(orderFactory, $timeout, $scope) {
		this.orders = {
			all: []
		};

		let self = this;

		orderFactory.getOrders().then(function (orders) {
			self.orders.all = orders;

			let timestampNow = new Date().getTime();

			self.orders.all.forEach(function (order) {

				let t = timestampNow - order.orderTimestamp;
				order.progress = 100 * t / (order.deliveryTimestamp - order.orderTimestamp);
			});

			$timeout(function() {
				$scope.$apply();
			});

		});
	}
})();
