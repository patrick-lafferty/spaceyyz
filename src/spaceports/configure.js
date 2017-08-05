(function () {
	'use strict';

	angular
		.module('spaceyyz')
		.component('configureSpaceport', {
			templateUrl: 'src/spaceports/configure.html',
			controller: ConfigureSpaceport
		});

	ConfigureSpaceport.$inject = ['spaceportFactory', '$timeout', '$scope', '$uibModal'];
	function ConfigureSpaceport(spaceportFactory, $timeout, $scope, $uibModal) {
		let self = this;

		this.search_name = '';
		this.newSpaceport = {};
		this.spaceports = {};
		this.successfullyCreated = false;

		spaceportFactory.getSpaceports().then(function (spaceports) {
			self.spaceports = spaceports;

			$timeout(function () {
				$scope.$apply();
			});
		});

		this.onChange = function () {
			self.successfullyCreated = false;
		};

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

			let index = self.spaceports.all.findIndex(function (s) {
				return s.name === spaceport.name;
			});

			self.spaceports.all[index] = spaceport;
		};

		this.createSpaceport = function (spaceport) {
			spaceportFactory.addSpaceport(spaceport);
			self.spaceports.all.push(spaceport);
			self.newSpaceport = {};
			this.successfullyCreated = true;
		};

		this.modalInstance = {};
		this.deleteSpaceport = function (spaceport) {
			self.modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				component: 'confirmSpaceportDeleteModal',
				backdrop: 'static',
				resolve: {
					spaceport: function() {
						return spaceport;
					}
				}
			
			});

			self.modalInstance.result.then(function (spaceport) {
				spaceportFactory.deleteSpaceport(spaceport);
				
				self.spaceports.all.splice(self.spaceports.all.indexOf(spaceport), 1);
			});
		};
	}
})();
