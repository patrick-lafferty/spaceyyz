import angular from 'angular';

class ConfigureSpaceport {

    static get $inject() {
        return ['spaceportService', '$timeout', '$scope', '$uibModal'];
    }

    constructor(spaceportService, $timeout, $scope, $uibModal) {
        Object.assign(this, {
            spaceportService,
            $timeout,
            $scope,
            $uibModal
        });

        this.search_name = '';
        this.newSpaceport = {};
        this.spaceports = {};
        this.successfullyCreated = false;
        this.modalInstance = {};
        this.search = spaceport => spaceport.name.toLowerCase().includes(this.search_name.toLowerCase());

        spaceportService.getSpaceports().then(spaceports => {
            this.spaceports = spaceports;

            $timeout(() => $scope.$apply());
        });
    }

    onChange() {
        this.successfullyCreated = false;
    }

    editSpaceport(spaceport) {
        spaceport.beingEdited = true;
    }

    cancelEditSpaceport(spaceport) {
        spaceport.beingEdited = false;
    }

    saveSpaceport(spaceport) {
        spaceport.beingEdited = false;
        spaceportService.updateSpaceport(spaceport);

        let index = this.spaceports.all.findIndex(function(s) {
            return s.name === spaceport.name;
        });

        this.spaceports.all[index] = spaceport;
    }

    createSpaceport(spaceport) {
        spaceportService.addSpaceport(spaceport);
        this.spaceports.all.push(spaceport);
        this.newSpaceport = {};
        this.successfullyCreated = true;
    }

    deleteSpaceport(spaceport) {
        this.modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            component: 'confirmSpaceportDeleteModal',
            backdrop: 'static',
            resolve: {
                spaceport: () => spaceport
            }

        });

        this.modalInstance.result.then(spaceport => {
            spaceportService.deleteSpaceport(spaceport);

            this.spaceports.all.splice(this.spaceports.all.indexOf(spaceport), 1);
        });
    }
}

const configureSpaceport = angular
    .module('spaceyyz.spaceports.configureSpaceport', [])
    .component('configureSpaceport', {
        templateUrl: 'src/spaceports/configure.html',
        controller: ConfigureSpaceport
    })
    .name;

export default configureSpaceport;