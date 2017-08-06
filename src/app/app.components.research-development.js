import angular from 'angular';
import engines from '../research-development/engines';
import engineFactory from '../research-development/engine.factory';
import confirmEngineDeleteModal from '../research-development/config-confirm-modal';

const researchDevelopment = angular
    .module('spaceyyz.components.researchDevelopment', [
        engines,
        engineFactory,
        confirmEngineDeleteModal
    ])
    .name;

export default researchDevelopment;