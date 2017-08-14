import angular from 'angular';

class Login {
	static get $inject() {
		return ['userService', '$state'];
	}

	constructor(userService, $state) {
		this.userService = userService;
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
		
		this.userService
			.login(this.email, this.password)
			.then(() => { 
				document.querySelector('.main-login').classList.add('login__transition');
				document.querySelector('.welcome').classList.add('welcome__transition');
				document.querySelector('.welcome__im').classList.add('welcome__im--animate');
				document.querySelector('.welcome__gradient-imitator').classList.add('welcome__gradient-imitator--animate');

				document.querySelector('.welcome__im').addEventListener('animationstart', function () {
					document.querySelector('.navigation').classList.add('navigation--slide-in');
				});
				document.querySelector('.welcome__im').addEventListener('animationend', () => {
					this.$state.go(this.$state.params.redirectTo || 'auth.home');
				});
			});
	}

	register() {
		if (this.newAccount.email === ''  			
			|| this.newAccount.password === ''
			|| this.newAccount.password !== this.newAccount.confirmPassword
			|| this.newAccount.password.length < 6) {
			return;
		}

		this.userService.register(this.newAccount.email, this.newAccount.password).then(
			() => this.$state.go(this.$state.params.redirectTo || 'auth.home'),
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