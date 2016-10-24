/* VehicleDevelopment is the component for the In Development page
 * It shows all of the orders currently being processed, with
 * a progress bar showing how many dates into the order they are.
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('vehicleDevelopment', {
			templateUrl: 'launch-vehicles/development.html',
			controller: VehicleDevelopment 
		});	

	function VehicleDevelopment(orderFactory, $timeout, $scope) {
		this.orders = {
			all: []
		};

		var self = this;

		orderFactory.getOrders().then(function (orders) {
			self.orders.all = orders;

			var timestampNow = new Date().getTime();

			self.orders.all.forEach(function (order) {
				var t = timestampNow - order.orderTimestamp;
				
				order.progress = 100 * t / (order.deliveryTimestamp - order.orderTimestamp);
			});

			$timeout(function() {
				$scope.$apply();
			});
		});
	}
})();
