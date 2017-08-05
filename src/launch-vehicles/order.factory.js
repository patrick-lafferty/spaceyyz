/* OrderFactory manages access to orders stored in firebase
 * */
(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('orderFactory', OrderFactory);

	function OrderFactory() {

		function getOrders() {
			return firebase.database().ref().child('orders/current').once('value').then(function(snapshot) {
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
			return firebase.database().ref().child('orders/nextId').transaction(
				function (currentValue) {
					return (currentValue || 0) + 1;
				});
		}

		function addOrder(order) {
			var key = firebase.database().ref().child('orders/current').push().key;
			var updates = {};

			order.deliveryTimestamp = order.deliveryDate.getTime();

			updates['/orders/current/' + key] = order;
			firebase.database().ref().update(updates);
		}

		function updateOrder(order)
		{
			firebase.database().ref().child('orders/current/' + order.key).set({
				number: order.number,
				orderTimestamp: order.orderTimestamp,
				deliveryTimestamp: order.deliveryDate.getTime(),
				vehicleName: order.vehicleName,
				cost: order.cost
			});
		}

		function deleteOrder(order) {
			firebase.database().ref().child('orders/current/' + order.key).remove();
		}

		return {
			getOrders: getOrders,
			getOrder: getOrder,
			getNewOrderNumber: getNewOrderNumber,
			addOrder: addOrder,
			updateOrder: updateOrder,
			deleteOrder: deleteOrder
		}

	}
})();
