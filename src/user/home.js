import angular from 'angular';

class Home {

	constructor(userService, $timeout, $scope) {
		this.user = {
			email: userService.email
		};

		//TODO: replace all onAuthChange(this with onAuthChange("componentName"
		userService.onAuthChange('home', (user) => {
			this.user.email = user.email;
			$timeout(function() {
				$scope.$apply();
			});
		});
	}

	static get $inject() {
		return ['userService', '$timeout', '$scope'];
	}
}

const home = angular
	.module('spaceyyz.user.home', [])
	.component('home', {
		templateUrl: 'src/user/home.html',
		controller: Home
	})
	.name;

export default home;
