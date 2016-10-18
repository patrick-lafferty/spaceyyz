(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('orderFactory', OrderFactory);

	function OrderFactory() {

		function getOrders(then) {
			firebase.database().ref().child("orders/current").once('value').then(function(snapshot) {
				var orderObject = snapshot.val();

				var orders = [];

				Object.keys(orderObject).forEach(function (key) {
					var object = orderObject[key];
					object.key = key;
					object.deliveryDate = new Date(object.deliveryTimestamp);
					orders.push(object);
				});

				then(orders);
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
			getNewOrderNumber: getNewOrderNumber,
			addOrder: addOrder
		}

	}
})();
