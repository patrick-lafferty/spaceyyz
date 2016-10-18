(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('orderFactory', OrderFactory);

	function OrderFactory() {

		function getOrders() {
			return firebase.database().ref().child("orders/current").once('value').then(function(snapshot) {
				var orderObject = snapshot.val();

				var orders = [];

				Object.keys(orderObject).forEach(function (key) {
					var object = orderObject[key];
					object.key = key;
					object.deliveryDate = new Date(object.deliveryTimestamp);
					object.orderDate = new Date(object.orderTimestamp);
					orders.push(object);
				});

				return orders;
			});
		}

		function getOrder(number) {
			return getOrders().then(function (orders) {
				var order = {};

				orders.forEach(function (o) {
					if (o.number === number) {
						order = o;
					}
				});

				return order;
			});
		}

		function getNewOrderNumber() {
			return firebase.database().ref().child("orders/nextId").transaction(
				function (currentValue) {
					return (currentValue || 0) + 1;
			});
		}

		function addOrder(order) {
			var key = firebase.database().ref().child("orders/current").push().key;
			var updates = {};

			order.deliveryTimestamp = order.deliveryDate.getTime();

			updates["/orders/current/" + key] = order;
			firebase.database().ref().update(updates);
		}

		return {
			getOrders: getOrders,
			getOrder: getOrder,
			getNewOrderNumber: getNewOrderNumber,
			addOrder: addOrder
		}

	}
})();