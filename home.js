(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('home', {
			templateUrl: 'home.html',
			controller: Home
		});

	function Home(userFactory, $timeout, $scope) {
		var self = this;
		this.user = {
			email: ""
		};

		//TODO: replace all onAuthChange(this with onAuthChange("componentName"
		userFactory.onAuthChange("home", function (user) {
			alert(user.email);
			self.user.email = user.email;
			$timeout(function() {
				$scope.$apply();
			});
		});
	}
})();
