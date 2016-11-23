/*
 * ConfirmEngineDeleteModal is a component for a modal that pops up when
 * the user tries to delete a engine in the Config page
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('confirmEngineDeleteModal', {
			controller: ConfirmEngineDeleteModal,
			templateUrl: 'src/research-development/config-confirm-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	ConfirmEngineDeleteModal.$inject = ['$scope', '$timeout', '$stateParams'];
	function ConfirmEngineDeleteModal($scope, $timeout, $stateParams) {

		this.engine = this.resolve.engine;
		var self = this;

		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close(self.engine);
		};

	}
})();
