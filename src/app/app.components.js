import angular from 'angular';
//import flight from 'app.components.flight';
//import launchVehicles from 'app.components.launchVehicles';
import user from './app.components.user';
//import researchDevelopment from 'app.components.researchDevelopment';
//import spaceports from 'app.components.spaceports';

const components = angular
    .module('spaceyyz.components', [
        //flight,
        //launchVehicles,
        user//,
        //researchDevelopment,
        //spaceports
    ])
    .name;

export default components;