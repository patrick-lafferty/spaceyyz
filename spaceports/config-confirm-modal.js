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
			templateUrl: 'spaceports/config-confirm-modal.html',
			bindings: {
				resolve: '<',
				modalInstance: '<'
			}
		});	

	function ConfirmSpaceportDeleteModal(spaceportFactory)  {

		this.spaceport = this.resolve.spaceport;
		var self = this;

		this.cancel = function() {
			self.modalInstance.dismiss('cancel');
		};

		this.confirm = function() {
			self.modalInstance.close(self.spaceport);
		};

	}
})();
