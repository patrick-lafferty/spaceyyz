import angular from 'angular';

const login = angular
	.module('spaceyyz.user.login', [])
	.component('login', {
		templateUrl: 'src/login/login.html',
		controller: Login
	})
	.name;

export default login;

Login.$inject = ['userFactory', '$state'];
function Login(userFactory, $state) {
	var self = this;
	this.email = '';
	this.password = '';
	this.newAccount = {
		email: '',
		password: '',
		confirmPassword: ''
	};

	this.login = function() {

		var promise = userFactory.login(self.email, this.password);
		promise.then(function() {
			$state.go($state.params.redirectTo || 'auth.home');
		});

	};

	this.register = function() {
		if (self.newAccount.email === ''  			
			|| self.newAccount.password === ''
			|| self.newAccount.password !== self.newAccount.confirmPassword) {
			return;
		}

		userFactory.register(self.newAccount.email, self.newAccount.password).then(
			function () {
				$state.go($state.params.redirectTo || 'auth.home');
			},
			function (error) {
				alert('Error registering: ' + error.code + ', ' + error.message);
			});
				
	};
}