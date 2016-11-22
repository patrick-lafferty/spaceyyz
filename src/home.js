(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('home', {
			templateUrl: 'src/home.html',
			controller: Home
		});

	Home.$inject = ['userFactory', '$timeout', '$scope'];
	function Home(userFactory, $timeout, $scope) {
		var self = this;
		this.user = {
			email: userFactory.user.email
		};

		//TODO: replace all onAuthChange(this with onAuthChange("componentName"
		userFactory.onAuthChange('home', function (user) {
			self.user.email = user.email;
			$timeout(function() {
				$scope.$apply();
			});
		});
	}
})();
