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
			userFactory.login(this.email, this.password, function() {
				$state.go('home');
			});

		};
		this.register = function() {userFactory.register(this.email, this.password);};
	}
})();
