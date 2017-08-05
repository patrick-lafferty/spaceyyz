import angular from 'angular';

class UserAccount {

	constructor(userFactory, $state, $scope, $timeout) {
		this.user = userFactory;
		$scope.user = userFactory;
		userFactory.onAuthChange(this, function () {
			$timeout(function() {
				$scope.$apply();
			});
		});
	}

	getEmail() {
		return userFactory.getEmail();
	}

	email() {
		return userFactory.getEmail();
	}

	login(email, password) {
		let promise = userFactory.login(email, password);
		promise.then(function() {
			$state.go('home');
		});
	}

	logout() {
		this.email = '';
		this.userFactory.logout();
	}

	isLoggedIn() {
		return this.user.email !== '';
	}

	static get $inject() {
		return ['userFactory', '$state', '$scope', '$timeout'];
	}
}

const account = angular
	.module('spaceyyz.user.account', [])
	.controller('userAccount', UserAccount)
	.name;

export default account;