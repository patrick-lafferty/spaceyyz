(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('login', {
			templateUrl: 'login/login.html',
			controller: Login
		});

	function Login() {
		this.email = "";
		this.password = "";

		this.login = function() {
			alert("Logging in with: " + this.email + ", " + this.password);

			firebase.auth()
				.signInWithEmailAndPassword(this.email, this.password).catch(function (error) {
					alert("Error logging in: " + error.code + ", " + error.message);
				});
		};

		this.register = function() {

			alert("Registering with: " + this.email + ", " + this.password);

			firebase.auth()
				.createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
					alert("Error registering: " + error.code + ", " + error.message);
				});

		};
	}

	/*angular
		.module('spaceyyz')
		.run(function($rootScope, $urlRouter) {
			$rootScope.$on('$locationChangeSuccess', function(evt) {
				evt.preventDefault();

				$state.go('login');
			});
		});*/

})();
