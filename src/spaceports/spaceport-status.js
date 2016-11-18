(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('spaceportStatus', {
			templateUrl: 'spaceports/spaceport-status.html',
			controller: Spaceports,
		});

	Spaceports.$inject = ['spaceportFactory', '$timeout', '$scope'];
	function Spaceports(spaceportFactory, $timeout, $scope) {
		var self = this;
		this.spaceports = {};
		
		spaceportFactory.getSpaceports().then(function (spaceports) {
			self.spaceports = spaceports;

			$timeout(function () {
				$scope.$apply();
			});
		});
	}
})();
