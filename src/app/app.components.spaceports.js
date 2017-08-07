import angular from 'angular';
import spaceport from '../spaceports/spaceport-status'; 
import spaceportFactory from '../spaceports/spaceport-factory';
import configureSpaceport from '../spaceports/configure';
import confirmSpaceportDeleteModal from '../spaceports/config-confirm-modal';

const spaceports = angular
      .module('spaceyyz.components.spaceports', [
          spaceport,
          spaceportFactory,
          configureSpaceport,
          confirmSpaceportDeleteModal
      ])
      .name;

export default spaceports;
