(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.controller('userAccount', UserAccount);

	function UserAccount(userFactory, $state, $scope, $timeout) {
		this.user = userFactory;
		$scope.user = userFactory;
		this.getEmail = function(){return userFactory.getEmail();};
		this.email = function(){return userFactory.getEmail();};
		this.login = function(email, password) {
			userFactory.login(email, password, function() {
				setupDB();
				$state.go('home');
			});
		};

		this.logout = function() {
			this.email = "";
			userFactory.logout();
			$state.go('home');
		};

		var self = this;
		this.isLoggedIn = function() {
			return self.user.user.email !== "";
		};

		userFactory.onAuthChange(self, function (user) {
			$timeout(function() {
				$scope.$apply();
			});
		});
	}
})();
