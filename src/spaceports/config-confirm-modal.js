/*
 * ConfirmSpaceportDeleteModal is a component for a modal that pops up when
 * the user tries to delete a spaceport in the Config page
 * */

(function() {
	'use strict';

	angular
		.module('spaceyyz')
		.component('confirmSpaceportDeleteModal', {
			controller: ConfirmSpaceportDeleteModal,
			templateUrl: 'src/spaceports/config-confirm-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	ConfirmSpaceportDeleteModal.$inject = ['spaceportFactory'];
	function ConfirmSpaceportDeleteModal(spaceportFactory)  {

		this.spaceport = this.resolve.spaceport;
		let self = this;

		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close(self.spaceport);
		};

	}
})();
