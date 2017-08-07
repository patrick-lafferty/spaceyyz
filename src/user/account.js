import angular from 'angular';

class UserAccount {

	constructor(userService, $state, $scope, $timeout) {
		this.user = userService;
		$scope.user = userService;
		userService.onAuthChange(this, function () {
			$timeout(function() {
				$scope.$apply();
			});
		});
	}

	getEmail() {
		return userService.getEmail();
	}

	email() {
		return userService.getEmail();
	}

	login(email, password) {
		let promise = userService.login(email, password);
		promise.then(function() {
			$state.go('home');
		});
	}

	logout() {
		this.email = '';
		this.userService.logout();
	}

	isLoggedIn() {
		return this.user.email !== '';
	}

	static get $inject() {
		return ['userService', '$state', '$scope', '$timeout'];
	}
}

const account = angular
	.module('spaceyyz.user.account', [])
	.controller('userAccount', UserAccount)
	.name;

export default account;