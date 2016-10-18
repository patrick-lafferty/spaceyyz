(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.factory('orderFactory', OrderFactory);

	function OrderFactory() {

		function getOrders(then) {
			firebase.database().ref().child("orders").once('value').then(function(snapshot) {
				var orderObject = snapshot.val();

				var orders = [];

				Object.keys(orderObject).forEach(function (key) {
					var object = orderObject[key];
					object.key = key;
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
			var key = firebase.database().ref().child("orders").push().key;
			var updates = {};

			updates["/orders/" + key] = order;
			firebase.database().ref().update(updates);
		}

		return {
			getOrders: getOrders,
			getNewOrderNumber: getNewOrderNumber,
			addOrder: addOrder
		}

	}
})();
