import angular from 'angular';
import spaceport from '../spaceports/spaceport-status'; 
import spaceportService from '../spaceports/spaceport-service';
import configureSpaceport from '../spaceports/configure';
import confirmSpaceportDeleteModal from '../spaceports/config-confirm-modal';

const spaceports = angular
      .module('spaceyyz.components.spaceports', [
          spaceport,
          spaceportService,
          configureSpaceport,
          confirmSpaceportDeleteModal
      ])
      .name;

export default spaceports;
