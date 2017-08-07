import angular from 'angular';
import engines from '../research-development/engines';
import engineService from '../research-development/engine.service';
import confirmEngineDeleteModal from '../research-development/config-confirm-modal';

const researchDevelopment = angular
    .module('spaceyyz.components.researchDevelopment', [
        engines,
        engineService,
        confirmEngineDeleteModal
    ])
    .name;

export default researchDevelopment;