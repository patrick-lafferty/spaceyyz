(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.controller('userAccount', function() {
			this.name = "";

			var self = this;
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					self.name = user.email;
				} else {
					self.name = "";
				}
			});
		});
})();
