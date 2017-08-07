/*
 * ConfirmSpaceportDeleteModal is a component for a modal that pops up when
 * the user tries to delete a spaceport in the Config page
 * */

import angular from 'angular';


class ConfirmSpaceportDeleteModal {

    static get $inject() {
        return ['spaceportFactory'];
    }

    $onInit() {

        this.spaceport = this.resolve.spaceport;
    }
    
    cancel() {
        this.modalInstance.dismiss('cancel');
    }

    confirm() {
        this.modalInstance.close(self.spaceport);
    }
	}

const confirmSpaceportDeleteModal = angular
      .module('spaceyyz.spaceports.confirmSpaceportDeleteModal', [])
		  .component('confirmSpaceportDeleteModal', {
			    controller: ConfirmSpaceportDeleteModal,
			    templateUrl: 'src/spaceports/config-confirm-modal.html',
			    bindings: {
				      resolve: '<',
				      modalInstance: '<'
			    }
		  })
      .name;	

export default confirmSpaceportDeleteModal;
