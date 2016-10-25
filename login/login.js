(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('login', {
			templateUrl: 'login/login.html',
			controller: Login
		});

	function Login(userFactory, $state) {

		this.email = "";
		this.password = "";
		this.login = function() {
			var promise = userFactory.login(this.email, this.password);
			promise.then(function(user) {
				$state.go($state.params.redirectTo);
			});

		};
		this.register = function() {userFactory.register(this.email, this.password);};
	}
})();
