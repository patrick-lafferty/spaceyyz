(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('login', {
			templateUrl: 'src/login/login.html',
			controller: Login
		});

	Login.$inject = ['userFactory', '$state'];
	function Login(userFactory, $state) {
		var self = this;
		this.email = "";
		this.password = "";
		this.newAccount = {
			email: "",
			password: "",
			confirmPassword: ""
		};

		this.login = function() {

			var promise = userFactory.login(self.email, this.password);
			promise.then(function(user) {
				$state.go($state.params.redirectTo || "auth.home");
			});

		};

		this.register = function() {
			if (self.newAccount.email === ""  			
				|| self.newAccount.password === ""
			    || self.newAccount.password !== self.newAccount.confirmPassword
				) {
				return;
			}

			userFactory.register(self.newAccount.email, self.newAccount.password).then(
					function (user) {
						$state.go($state.params.redirectTo || "auth.home");
					},
					function (error) {
						alert("Error registering: " + error.code + ", " + error.message);
					});
					
		};
	}
})();
