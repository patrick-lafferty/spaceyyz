var firebase = { store: {} };

/* Replacement for Firebase's Promise
 * Returns the value immediately (not async)
 * */
function Promise (foo) {
	this.value = foo;
}

Promise.prototype.then = function (onSuccess) {
	onSuccess(this.value);
};

/* Replacement for Firebase's Snapshot
 * Just stores and returns a single value
 * */
function Snapshot (value) {
	this.value = value;
}

Snapshot.prototype.val = function () {
	return this.value;
};

firebase.database = function () {

	self.ref = function () {
		return {
			child: function (name) {
				return {
					once: function (unused) {
						return new Promise(new Snapshot(firebase.store[name]));
					}
				};
			}
		};
	};

	return self; /*{

		ref: function () {
		},

	};*/
};

var exports = module.exports = {
	firebase: firebase,
	Promise: Promise

};
