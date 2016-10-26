(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('configureSpaceport', {
			templateUrl: 'spaceports/configure.html',
			controller: ConfigureSpaceport
		});

	function ConfigureSpaceport(spaceportFactory, $timeout, $scope) {
		var self = this;

		this.search_name = "";
		this.newSpaceport = {};
		this.spaceports = {};

		spaceportFactory.getSpaceports().then(function (spaceports) {
			self.spaceports = spaceports;

			$timeout(function () {
				$scope.$apply();
			});
		});

		this.search = function (spaceport) {
			return spaceport.name.toLowerCase().includes(self.search_name.toLowerCase());
		};

		this.editSpaceport = function (spaceport) {
			spaceport.beingEdited = true;
		};

		this.cancelEditSpaceport = function (spaceport) {
			spaceport.beingEdited = false;
		};

		this.saveSpaceport = function (spaceport) {
			spaceport.beingEdited = false;
			spaceportFactory.updateSpaceport(spaceport);

			var index = self.spaceports.findIndex(function (s) {
				return s.name === spaceport.name;
			});

			self.spaceports[index] = spaceport;
		};

		this.createSpaceport = function (spaceport) {
			spaceportFactory.createSpaceport(spaceport);
			self.spaceports.push(spaceport);
			self.newSpaceport = {};
		};

		this.deleteSpaceport = function (spaceport) {
		};
	}
})();
