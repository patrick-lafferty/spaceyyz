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
				let nav = document.querySelector('.navigation');
				nav.classList.add('navigation--offscreen');

				document.querySelector('.main-login').classList.add('login__transition');
				document.querySelector('.welcome').classList.add('welcome__transition');

				let message = document.querySelector('.message__gradient-imitator');
				message.classList.add('message__gradient-imitator--animate');

				document.querySelector('.welcome__gradient-imitator').classList.add('welcome__gradient-imitator--animate');

				message.addEventListener('animationstart', function () {
					nav.classList.add('navigation--slide-in');
				});

				message.addEventListener('animationend', () => {
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