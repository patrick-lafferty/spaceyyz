/*
 * ConfigVehicle is the component for Config page. Its used to add/modify/delete launch
 * vehicles from the database
 * */
//import {PromiseImpl as Promise} from 'firebase';
import angular from 'angular';

class Config {

    constructor(vehicleInventoryService, $scope, $timeout, $uibModal, engineService, variantService) {
        Object.assign(this, {
            vehicleInventoryService,
            $scope,
            $timeout,
            $uibModal,
            engineService,
            variantService
        });

        this.vehicles = {
            all: [],
        };

        this.engines = [];

        this.newVehicle = {
            variants: []
        };
        this.variants = [];
        this.search_name = '';
        this.modalInstance = {};

        this.search = vehicle => vehicle.name.toLowerCase().includes(this.search_name.toLowerCase());

        /*
         * vehicles/engines/variants are stored separately in the database, so we need to combine them all here to display
         * */
        Promise
            .all([
                vehicleInventoryService.getVehicles(),
                engineService.getEngines(),
                variantService.getFamilies()
            ])
            .then(results => {
                this.vehicles.all = results[0].allVehicles;
                this.engines = results[1];

                let variants = results[2];

                variants.forEach(family => {
                    let vehicle = this.vehicles.all.find(vehicle => vehicle.familyKey === family.key);

                    if (vehicle !== undefined) {
                        vehicle.variants = family.variants;

                        vehicle.variants.forEach(variant => {
                            variant.stages.forEach(stage => {
                                stage.engines = stage.engines.map(engineKey => this.engines.find(engine => engine.key === engineKey));
                            });
                        });
                    }
                });

                $timeout(() => this.$scope.$apply());
            });
    }

    static get $inject() {
        return ['vehicleInventoryService', '$scope', '$timeout', '$uibModal', 'engineService', 'variantService'];
    }



    editVehicle(vehicle) {
        vehicle.beingEdited = true;
    }

    cancelEditVehicle(vehicle) {
        vehicle.beingEdited = false;
    }

    setVariantCount(variant, familyKey) {
        this.variantService.setVariantCount(variant, familyKey);
    }

    saveVehicle(vehicle) {
        vehicle.beingEdited = false;
        this.vehicleInventoryService.updateVehicle(vehicle);

        let index = this.vehicles.all.findIndex(v => v.name === vehicle.name);

        this.vehicles.all[index] = vehicle;
    }

    deleteVehicle(vehicle) {
        this.modalInstance = this.$uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            component: 'confirmVehicleDeleteModal',
            backdrop: 'static',
            resolve: {
                vehicle: () => vehicle
            }
        });

        this.modalInstance.result.then(vehicle => {
            this.vehicleInventoryService.deleteVehicle(vehicle);
            this.vehicles.all.splice(this.vehicles.all.indexOf(vehicle), 1);
        });
    }

    createVehicle(vehicle) {
        this.vehicleInventoryService.addVehicle(vehicle);
        this.vehicles.all.push(vehicle);
        this.newVehicle = {
            variants: []
        };
        this.variants = [];
    }

    addNewVariant(vehicle) {
        vehicle.variants.push({
            name: 'Unnamed',
            stages: []
        });
    }

    removeVariant(index, vehicle) {
        vehicle.variants.splice(index, 1);
    }

    addNewStage(variant) {
        variant.stages.push({
            engines: [],
            selectedEngine: {}
        });
    }

    removeStage(index, variant) {
        variant.stages.splice(index, 1);
    }

    addEngine(engine, stage) {
        if (engine.name === undefined) {
            return;
        }

        stage.engines.push(engine);
    }

    removeEngine(index, stage) {
        stage.engines.splice(index, 1);
    }
}

const config = angular
    .module('spaceyyz.launchVehicles.config', [])
    .component('configVehicle', {
        templateUrl: 'src/launch-vehicles/config.html',
        controller: Config,
    })
    .name;

export default config;
