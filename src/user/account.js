import angular from 'angular';

class UserAccount {

	constructor(userService, $state, $scope, $timeout) {
		Object.assign(this, {
			userService, $state
		});
		this.user = userService;
		$scope.user = userService;
		userService.onAuthChange(this, function () {
			$timeout(function() {
				$scope.$apply();
			});
		});
	}

	getEmail() {
		return this.userService.getEmail();
	}

	email() {
		return this.userService.getEmail();
	}

	login(email, password) {
		this.userService
			.login(email, password)
			.then(() => this.$state.go('home'));
	}

	logout() {
		this.email = '';
		this.userService.logout();
	}

	isLoggedIn() {
		return this.userService.email !== '';
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