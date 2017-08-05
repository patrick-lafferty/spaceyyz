/*
 * ConfirmVehicleDeleteModal is a component for a modal that pops up when
 * the user tries to delete a vehicle in the Config page
 * */

import angular from 'angular';

class ConfirmVehicleDeleteModal {

	$onInit() {
		this.vehicle = this.resolve.vehicle;
	}
	
	cancel() {
		this.modalInstance.dismiss('cancel');
	}

	confirm() {
		this.modalInstance.close(this.vehicle);
	}
}

const confirmVehicleDeleteModal = angular
	.module('spaceyyz.launchVehicles.confirmVehicleDeleteModal', [])
	.component('confirmVehicleDeleteModal', {
		controller: ConfirmVehicleDeleteModal,
		templateUrl: 'src/launch-vehicles/config-confirm-modal.html',
		bindings: {
			resolve: '<',
			modalInstance: '<'
		}
	})
	.name;	

export default confirmVehicleDeleteModal;