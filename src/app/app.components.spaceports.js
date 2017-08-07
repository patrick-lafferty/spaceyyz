import angular from 'angular';
import spaceport from '../spaceports/spaceport-status.js'; 
import spaceportFactory from '../spaceports/spaceport-factory.js';
import configureSpaceport from '../spaceports/configure.js';
import confirmSpaceportDeleteModal from '../spaceports/config-confirm-modal.js';

const spaceports = angular
      .module('spaceyyz.components.spaceports', [
          spaceport,
          spaceportFactory,
          configureSpaceport,
          confirmSpaceportDeleteModal
      ])
      .name;

export default spaceports;
