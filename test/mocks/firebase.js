/* Replacement for Firebase's Promise
 * Returns the value immediately (not async)
 * */
export class Promise {
	constructor (foo) {
		this.value = foo;
	}

	then(onSuccess) {
		onSuccess(this.value);
	}
}

/* Replacement for Firebase's Snapshot
 * Just stores and returns a single value
 * */
class Snapshot {
	constructor (value) {
		this.value = value;
	}

	val() {
		return this.value;
	}
}

export let firebase = {
	store: {},
	database: function () {
		return { 

			ref: function () {
				return {
					child: function (name) {
						return {
							once: function () {
								return new Promise(new Snapshot(firebase.store[name]));
							}
						};
					}
				};
			}
		};
	}
};
