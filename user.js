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
			var promise = userFactory.login(email, password);/*, function() {
				$state.go('home');
			});*/
			promise.then(function(user) {
				$state.go('home');
			});
		};

		this.logout = function() {
			this.email = "";
			userFactory.logout();
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
