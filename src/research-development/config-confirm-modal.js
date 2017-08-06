/*
 * ConfirmEngineDeleteModal is a component for a modal that pops up when
 * the user tries to delete a engine in the Config page
 * */
import angular from 'angular';

class ConfirmEngineDeleteModal {

	$onInit() {
		this.engine = this.resolve.engine;
	}

	cancel() {
		this.modalInstance.dismiss('cancel');
	}

	confirm() {
		this.modalInstance.close(this.engine);
	}
}

const confirmEngineDeleteModal = angular
	.module('spaceyyz.researchDevelopment.confirmEngineDeleteModal', [])
	.component('confirmEngineDeleteModal', {
		controller: ConfirmEngineDeleteModal,
		templateUrl: 'src/research-development/config-confirm-modal.html',
		bindings: {
			resolve: '<',
			modalInstance: '<'
		}
	})
	.name;	

export default confirmEngineDeleteModal;