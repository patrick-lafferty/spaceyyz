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

			$timeout(function() {
				$scope.$apply();
			});
		});
	}
})();
