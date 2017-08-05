/* OrderFactory manages access to orders stored in firebase
 * */
import angular from 'angular';

class OrderFactory {

	getOrders() {
		return firebase.database().ref().child('orders/current').once('value').then(function(snapshot) {
			var orderObject = snapshot.val();
			var orders = [];

			Object.keys(orderObject).forEach(function (key) {
				let object = orderObject[key];
				object.key = key;
				object.deliveryDate = new Date(object.deliveryTimestamp);
				object.orderDate = new Date(object.orderTimestamp);
				orders.push(object);
			});

			return orders;
		});
	}

	getOrder(number) {
		return this.getOrders().then(orders => orders.find(order => order.number === number));
	}

	getNewOrderNumber() {
		return firebase.database().ref().child('orders/nextId').transaction(
			function (currentValue) {
				return (currentValue || 0) + 1;
			});
	}

	addOrder(order) {
		var key = firebase.database().ref().child('orders/current').push().key;
		var updates = {};

		order.deliveryTimestamp = order.deliveryDate.getTime();

		updates['/orders/current/' + key] = order;
		firebase.database().ref().update(updates);
	}

	updateOrder(order)
	{
		firebase.database().ref().child('orders/current/' + order.key).set({
			number: order.number,
			orderTimestamp: order.orderTimestamp,
			deliveryTimestamp: order.deliveryDate.getTime(),
			vehicleName: order.vehicleName,
			cost: order.cost
		});
	}

	deleteOrder(order) {
		firebase.database().ref().child('orders/current/' + order.key).remove();
	}
}

const orderFactory = angular
		.module('spaceyyz.launchVehicles.orderFactory', [])
		.factory('orderFactory', OrderFactory)
		.name;

export default orderFactory;