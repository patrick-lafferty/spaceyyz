import angular from 'angular';

const account = angular
	.module('spaceyyz.user.account', [])
	.controller('userAccount', UserAccount)
	.name;

export default account;


UserAccount.$inject = ['userFactory', '$state', '$scope', '$timeout'];
function UserAccount(userFactory, $state, $scope, $timeout) {
	var self = this;
	this.user = userFactory;
	$scope.user = userFactory;
	this.getEmail = function(){return userFactory.getEmail();};
	this.email = function(){return userFactory.getEmail();};
	this.login = function(email, password) {
		var promise = userFactory.login(email, password);
		promise.then(function() {
			$state.go('home');
		});
	};

	this.logout = function() {
		this.email = '';
		userFactory.logout();
	};

	this.isLoggedIn = function() {
		return self.user.user.email !== '';
	};

	userFactory.onAuthChange(self, function () {
		$timeout(function() {
			$scope.$apply();
		});
	});
}
