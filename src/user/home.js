import angular from 'angular';

class Home {

	constructor(userFactory, $timeout, $scope) {
		this.user = {
			email: userFactory.email
		};

		//TODO: replace all onAuthChange(this with onAuthChange("componentName"
		userFactory.onAuthChange('home', (user) => {
			this.user.email = user.email;
			$timeout(function() {
				$scope.$apply();
			});
		});
	}

	static get $inject() {
		return ['userFactory', '$timeout', '$scope'];
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
