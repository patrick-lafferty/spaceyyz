var firebase = {};

function Promise (foo) {
	this.value = foo;
}

Promise.prototype.then = function (onSuccess) {
	onSuccess(this.value);
};

function Snapshot (value) {
	this.value = value;
}

Snapshot.prototype.val = function () {
	return this.value;
};

firebase.database = function () {
	var things = {engines: {}};

	return {
		ref: function () {
			return {
				child: function (name) {
					return {
						once: function (unused) {
							return new Promise(new Snapshot(things[name]));
						}
					};
				}
			};
		},

	};
};

var exports = module.exports = firebase;
