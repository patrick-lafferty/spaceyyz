import angular from 'angular';

class Login {
	static get $inject() {
		return ['userFactory', '$state'];
	}

	constructor(userFactory, $state) {
		this.userFactory = userFactory;
		this.$state = $state;
		this.email = '';
		this.password = '';
		this.newAccount = {
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	login() {
		let promise = this.userFactory.login(this.email, this.password);
		promise.then(function() {
			this.$state.go(this.$state.params.redirectTo || 'auth.home');
		});
	}

	register() {
		if (this.newAccount.email === ''  			
			|| this.newAccount.password === ''
			|| this.newAccount.password !== this.newAccount.confirmPassword) {
			return;
		}

		this.userFactory.register(this.newAccount.email, this.newAccount.password).then(
			function () {
				this.$state.go(this.$state.params.redirectTo || 'auth.home');
			},
			function (error) {
				alert('Error registering: ' + error.code + ', ' + error.message);
			});
	}
}

const login = angular
	.module('spaceyyz.user.login', [])
	.component('login', {
		templateUrl: 'src/user/login.html',
		controller: Login
	})
	.name;

export default login;