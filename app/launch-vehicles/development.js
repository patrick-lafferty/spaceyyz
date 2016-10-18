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

		orderFactory.getOrders(function (orders) {
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
