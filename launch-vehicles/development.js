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

	function VehicleDevelopment(orderFactory, $timeout, $scope, vehicleInventoryFactory) {
		this.orders = {
			all: []
		};

		var self = this;

		orderFactory.getOrders().then(function (orders) {
			self.orders.all = orders;

			var timestampNow = new Date().getTime();

			vehicleInventoryFactory.getVehicles().then(function (vehicles) {
				    
				var number = 23;

				self.orders.all.forEach(function (order) {
					var nameWithoutSpaces = order.vehicleName.replace(/\s+/g, "-");
					
					for(var i = 0; i < vehicles.vehicles.length; i++) {
						if (vehicles.vehicles[i].nameWithoutSpaces === nameWithoutSpaces) {
							order.cost = vehicles.vehicles[i].cost;
							break;
						}
					}

					var t = timestampNow - order.orderTimestamp;
					order.progress = 100 * t / (order.deliveryTimestamp - order.orderTimestamp);
					var o = new Date(order.orderDate.getTime());
					order.deliveryDate = new Date(o.setFullYear(o.getFullYear() + 1));
					order.number = number;
					number++;

					//orderFactory.updateOrder(order);
				});

				$timeout(function() {
					$scope.$apply();
				});
			});

		});
	}
})();
